import { Component, OnDestroy, OnInit } from '@angular/core';
import { TaskService } from '../../services/task/task.service';
import { ActivatedRoute } from '@angular/router';
import { Task } from '../../../models/task/task.model';
import { TaskContextService } from '../../services/context/task-context.service';
import { Subject, takeUntil } from 'rxjs';
import { Comment } from '../../../models/comment.model';
import { TaskPatchRequest } from '../../../models/task/taskpatchRequest.model';
import { WorkflowService } from '../../../shared/services/workflow/workflow.service';
import { State } from '../../../models/state';
import { Attachment } from '../../../models/attachment.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PermissionType } from '../../../models/permission-type.model';
import { TaskOperation } from '../../../models/task/taskOperation.model';
import { TaskViewComponent } from '../../views/task-view/task-view.component';
import { Taskmetadata } from '../../../models/task/task.metadata.model';
import { TaskPatchResponse } from '../../../models/task/taskpatchResponse.model';

@Component({
  selector: 'app-task',
  imports: [TaskViewComponent, CommonModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent implements OnInit, OnDestroy {
  task!: Task;
  states: State[] = [];
  private destroy = new Subject<void>();
  taskForm!: FormGroup;
  tempFields: { [key: string]: string } = {};
  hasWritePermission: boolean = false;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private context: TaskContextService,
    private workflowService: WorkflowService,
    private fb: FormBuilder
  ) {}

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  ngOnInit() {
    this.getTask();
    this.listenAttachments();
  }

  saveField(payload: { field: string; value: string }) {
    this.taskForm.get(payload.field)?.disable();
    const patch: TaskPatchRequest = {};
    switch (payload.field) {
      case 'description':
        patch.taskMetadataDTO = patch.taskMetadataDTO ?? {};
        patch.taskMetadataDTO.description = payload.value;
        break;
      case 'taskName':
        patch.taskName = payload.value;
        break;
    }
    this.updateTask(patch);
  }

  updateTaskFromTaskPatch(taskpatch: TaskPatchResponse) {
      if (taskpatch.taskName !== undefined)
        this.task.taskName = taskpatch.taskName;
      if (taskpatch.state !== undefined) {
      this.task.state = taskpatch.state;
      this.taskForm.get('state')?.setValue(taskpatch.state);
    }
      if (taskpatch.taskMetadataDTO !== undefined) {
        this.task.taskMetadataDTO = {
          ...this.task.taskMetadataDTO,
          ...this.pickDefined(taskpatch.taskMetadataDTO),
        } as Taskmetadata;
      }
  }

  cancelEditing(field: string) {
    this.taskForm.get(field)?.setValue(this.tempFields[field]);
    this.taskForm.get(field)?.disable();
  }

  enableEditing(event: { field: string; value: string }) {
    this.tempFields[event.field] = event.value;
    this.taskForm.get(event.field)?.enable();
  }

  stateChange(value: string) {
    const patch: TaskPatchRequest = {
      fromState: this.task.state,
      toState: value
    };
    this.updateTask(patch);
  }

  updateTask(taskpatch: TaskPatchRequest) {
    this.taskService.updateTaskMetadata(taskpatch).subscribe((taskpatch) => {
      this.updateTaskFromTaskPatch(taskpatch);
    });
  }

  pickDefined<T>(obj: Partial<T>): Partial<T> {
    const result: Partial<T> = {};
    for (const key in obj) {
      if (obj[key] !== undefined) {
        result[key] = obj[key];
      }
    }
    return result;
  }

  getTask() {
    const combinedId = this.route.snapshot.paramMap.get('combinedId')!;
    const [projectKey, taskId] = combinedId.split('-');
    if (!taskId || !projectKey) return;
    this.taskService
      .getTask(projectKey, taskId)
      .subscribe(({ task, states }) => {
        this.initializeTask(task, states);
      });
  }

  initializeTask(task: Task, states: State[]): void {
    this.task = task;
    this.buildFormGroup();
    this.states = states;
    this.hasWritePermission = this.task.permissionTypes.includes(
      PermissionType.WRITE
    );
    this.listenComment();
    this.listenAttachments();
  }

  buildFormGroup() {
    this.taskForm = this.fb.group({
      taskName: [{ value: this.task.taskName ?? '', disabled: true }],
      state: [this.task.state ?? ''],
      createdDate: [
        this.task.createdDate ?? new Date().toISOString().split('T')[0],
      ],
      modifiedDate: [
        this.task.modifiedDate ?? new Date().toISOString().split('T')[0],
      ],
      taskMetadataDTO: this.fb.group({
        description: [
          {
            value: this.task.taskMetadataDTO?.description ?? '',
            disabled: true,
          },
        ],
        assignedTo: [this.task.taskMetadataDTO?.assignedTo ?? ''],
      }),
    });
  }

  getStates(projectId: number, fromState: string) {
    this.workflowService
      .getStatesForProject(projectId, fromState)
      .subscribe((states) => {
        this.states = states;
      });
  }

  listenComment() {
    this.context.streamComment.outputStream.listener
      .pipe(takeUntil(this.destroy))
      .subscribe(([{ comment, operation, isListening }]) => {
        this.handleComment({ comment, operation, isListening });
      });
  }

  private handleComment(content: {
    comment?: Comment;
    operation?: string;
    isListening?: boolean;
  }) {
    if (content.isListening && this.task.commentDTOS) {
      this.context.streamComment.inputStream.add([this.task.commentDTOS]);
    }

    if (content.comment && content.operation) {
      switch (content.operation) {
        case TaskOperation.Add:
          this.taskService
            .saveComment(content.comment)
            .subscribe((newComment) => {
              this.context.streamComment.inputStream.add([[newComment]]);
            });
          break;
        case TaskOperation.Delete:
          break;
        case TaskOperation.Update:
          this.taskService
            .updateComment(content.comment)
            .subscribe((updatedComment) => {
              this.context.streamComment.inputStream.add([[updatedComment]]);
            });
          break;
      }
    }
  }

  listenAttachments() {
    this.context.streamAttachment.outputStream.listener
      .pipe(takeUntil(this.destroy))
      .subscribe(([{ attachment, file, operation, isListening }]) => {
        this.handleAttachment({ attachment, file, operation, isListening });
      });
  }

  private handleAttachment(payload: {
    attachment?: Attachment;
    file?: File;
    operation?: TaskOperation;
    isListening?: boolean;
  }) {
    const attachments = this.task.attachmentDTOS;
    if (payload.isListening && attachments) {
      this.context.streamAttachment.inputStream.add([attachments]);
    }
    if (!payload.operation) return;
    switch (payload.operation) {
      case TaskOperation.Add:
        if (!payload.file) return;
        this.uploadNewAttachment(payload.file);
        break;

      case TaskOperation.Delete:
        if (!payload.attachment) return;
        this.deleteAttachment(payload.attachment);
        break;

      case TaskOperation.Download:
        if (!payload.attachment) return;
        this.downloadAttachment(payload.attachment.id);
        break;
    }
  }

  private deleteAttachment(attachment: Attachment) {
    this.taskService.deleteAttachment(attachment.id).subscribe({
      next: () => console.log('Delete successful'),
      error: (err) => {
        console.log('Backend error occured: ', err);
      },
    });
  }

  private uploadNewAttachment(file: File) {
    this.taskService.uploadAttachment(file).subscribe((attachment) => {
      const emptyFile = new File([new Blob()], 'empty.txt');
      this.context.streamAttachment.inputStream.add([[attachment]]);
    });
  }

  private downloadAttachment(attachmentId: number) {
    this.taskService.downloadAttachment(attachmentId).subscribe((response) => {
      const blob = response.body!;
      const contentDisposition = response.headers.get('Content-Disposition');
      const filename =
        this.extractFilenameFromContentDisposition(contentDisposition);
      this.downloadBlob(blob, filename);
    });
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

  extractFilenameFromContentDisposition(header: string | null): string {
    if (!header) return 'downloaded-file';
    const match = header.match(/filename="?([^"]+)"?/);
    return match && match[1] ? match[1] : 'downloaded-file';
  }
}
