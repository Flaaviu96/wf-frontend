import { Component, OnDestroy, OnInit } from '@angular/core';
import { TaskService } from '../../services/task/task.service';
import { ActivatedRoute } from '@angular/router';
import { Task } from '../../../models/task.model';
import { TaskViewComponent } from "../task-view/task-view.component";
import { ProjectCacheService } from '../../../shared/services/project-cache/project-cache.service';
import { TaskContextService } from '../../services/context/task-context.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-task',
  imports: [TaskViewComponent],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent implements OnInit, OnDestroy{
  task : Task | null = null;
  private file : File | null = null;
  private destroy = new Subject<void>();

  constructor(
    private taskService : TaskService,
    private route: ActivatedRoute,
    private projectCache : ProjectCacheService,
    private context : TaskContextService
  ) {}

  ngOnDestroy(): void {
    this.destroy.next;
    this.destroy.unsubscribe;
  }

  ngOnInit() {
    this.getTask();
    this.listenNewOrUpdateComment();
  }

  getTask() {
    const taskId = this.route.snapshot.paramMap.get('taskId')!;
    const projectKey = this.route.snapshot.paramMap.get('projectKey')!;
    if (!taskId || !projectKey) return;

    this.projectCache.getProjectId(projectKey).subscribe(projectId => {
      if (!projectId) return;
      this.taskService.getTask(projectId, taskId).subscribe(task => {
        this.context.setProjectAndTaskKey(projectId, taskId);
        this.task = task;
      })
    })
  }

  listenNewOrUpdateComment() {
    this.context.dualComment.getIntent().listener
    .pipe(takeUntil(this.destroy))
    .subscribe(Comment => {
      const {projectKey, taskKey} = this.context.getProjectAndTaskKeys();
      this.taskService.updateComment(projectKey, taskKey, Comment).subscribe(newComment => {
        this.context.dualComment.getListen().add(newComment);
      })
    })
  }

  testCeva(file : File) {
    console.log("From Taskcomponent"+ file.name);
  }
}
