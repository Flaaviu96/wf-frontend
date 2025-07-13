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
  }

  getTask() {
    const taskId = this.route.snapshot.paramMap.get('taskId')!;
    const projectKey = this.route.snapshot.paramMap.get('projectKey')!;
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
    .subscribe(([taskMetadata]) => {
      this.updateTaskMetadata(taskMetadata);
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

  private updateTaskMetadata(patch : TaskPatch) {
    const {projectKey, taskKey} = this.context.getProjectAndTaskKeys();
    this.taskService.updateTaskMetadata(projectKey, taskKey, patch).subscribe((patch : TaskPatch) => {
      this.context.dualChanges.getListen().add([patch]);
    })
  }

  testCeva(file : File) {
  }
}
