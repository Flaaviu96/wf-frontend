import { Component, OnDestroy, OnInit } from '@angular/core';
import { TaskService } from '../../services/task/task.service';
import { ActivatedRoute } from '@angular/router';
import { Task } from '../../../models/task.model';
import { TaskViewComponent } from "../task-view/task-view.component";
import { ProjectCacheService } from '../../../shared/services/project-cache/project-cache.service';
import { TaskContextService } from '../../services/context/task-context.service';
import { filter, map, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { Comment } from '../../../models/comment.model';
import { TaskPatch } from '../../../models/taskpatch.model';
import { WorkflowService } from '../../../shared/services/workflow/workflow.service';
import { State } from '../../../models/state';
import { Attachment } from '../../../models/attachment.model';

@Component({
  selector: 'app-task',
  imports: [TaskViewComponent],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent implements OnInit, OnDestroy{
  task!: Task;
  states: State[] = [];
  private destroy = new Subject<void>();

  constructor(
    private taskService : TaskService,
    private route: ActivatedRoute,
    private projectCache : ProjectCacheService,
    private context : TaskContextService,
    private workflowService : WorkflowService
  ) {}

  ngOnDestroy(): void {
    this.destroy.next()
    this.destroy.complete();
  }

  ngOnInit() {
    this.getTask();
    this.listenNewOrUpdateComment();
    this.listenTaskMetadataChanges();
    this.listenAttachments();
  }

  getTask() {
    const combinedId = this.route.snapshot.paramMap.get('combinedId')!;
    const [projectKey, taskId] = combinedId.split('-');
    if (!taskId || !projectKey) return;
    this.projectCache.getProjectId(projectKey).pipe(
      filter(projectId => !!projectId),
      switchMap(projectId =>
        this.taskService.getTask(projectId, taskId).pipe(
          tap(task => {
            this.context.setProjectAndTaskKey(projectId, taskId);
            this.task = task;
            this.getStates(Number(projectId), task.state);
          })
        )
      )
    ).subscribe();
  }

  getStates(projectId : number, fromState : string) {
    this.workflowService.getStatesForProject(projectId, fromState).subscribe(states => {
      this.states = states;
    })
  }

  listenNewOrUpdateComment() {
    this.context.dualComment.getIntent().listener
    .pipe(takeUntil(this.destroy))
    .subscribe(([Comment, isNew]) => {
      this.updateOrCreateNewComment([Comment, isNew])
    })
  }

  listenTaskMetadataChanges() {
    this.context.dualChanges.getIntent().listener
    .pipe(takeUntil(this.destroy))
    .subscribe(([taskMetadata, option]) => {
      this.updateTaskMetadata(taskMetadata, option);
    })
  }

  listenAttachments() {
    this.context.dualAttachment.getIntent().listener
    .pipe(takeUntil(this.destroy))
    .subscribe(([attachment, file, options]) => {
      if (options === "delete") {
        this.deleteAttachment(attachment);
        return;
      }
      if (options === "download") {
        this.downloadAttachment(attachment.id!);
        return;
      }
      this.uploadNewAttachment(file);
    })
  }



  private updateOrCreateNewComment(commentTuple : [Comment, boolean]) {
    const [comment, isNew] = commentTuple;
    const {projectKey, taskKey} = this.context.getProjectAndTaskKeys();
    if (isNew) {
      this.taskService.saveComment(projectKey, taskKey, comment).subscribe(newComment => {
        this.context.dualComment.getListen().add([newComment, true]);
      })
    } else {
      this.taskService.updateComment(projectKey, taskKey, comment).subscribe(updatedComment => {
        this.context.dualComment.getListen().add([updatedComment, false]);
      })
    }
  }

  private updateTaskMetadata(patch : TaskPatch, option : string) {
    const {projectKey, taskKey} = this.context.getProjectAndTaskKeys();
    this.taskService.updateTaskMetadata(projectKey, taskKey, patch).subscribe((patch : TaskPatch) => {
      console.log(patch);
      this.context.dualChanges.getListen().add([patch, option]);
    })
  }

  private deleteAttachment(attachment : Attachment) {
    const {projectKey, taskKey} = this.context.getProjectAndTaskKeys();
    this.taskService.deleteAttachment(projectKey, taskKey, attachment.id).subscribe({
      next: () => console.log('Delete successful'),
      error: (err) => {
        console.log('Backend error occured: ', err);
      }
    })
  }

  private uploadNewAttachment(file : File) {
    const {projectKey, taskKey} = this.context.getProjectAndTaskKeys();
    this.taskService.uploadAttachmentStream(projectKey, taskKey, file).subscribe(attachment => {
      const emptyFile = new File([new Blob()], "empty.txt");
      this.context.dualAttachment.getListen().add([attachment, emptyFile, "add"]);
    });
  }

  private downloadAttachment(attachmentId : number) {
    const {projectKey, taskKey} = this.context.getProjectAndTaskKeys();
    this.taskService.downloadAttachment(projectKey, taskKey, attachmentId).subscribe(response => {
    const blob = response.body!;
    const contentDisposition = response.headers.get('Content-Disposition');
    const filename = this.extractFilenameFromContentDisposition(contentDisposition);
    this.downloadBlob(blob, filename);
    })
  }

  private downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;

  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}

   extractFilenameFromContentDisposition(header: string | null) : string {
    if (!header) return 'downloaded-file';
    const match = header.match(/filename="?([^"]+)"?/);
    return match && match[1] ? match[1] : 'downloaded-file';
   }
}
