import { Component } from '@angular/core';
import { TaskService } from '../../services/task/task.service';
import { ActivatedRoute } from '@angular/router';
import { Task } from '../../../models/task.model';
import { TaskViewComponent } from "../task-view/task-view.component";
import { ProjectCacheService } from '../../../shared/services/project-cache/project-cache.service';

@Component({
  selector: 'app-task',
  imports: [TaskViewComponent],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {
  task : Task | null = null;
  private file : File | null = null;

  constructor(
    private taskService : TaskService,
    private route: ActivatedRoute,
    private projectCache : ProjectCacheService
  ) {}

  ngOnInit() {
    console.log("before init");
    this.getTask();
  }

  getTask() {
    const taskId = this.route.snapshot.paramMap.get('taskId')!;
    const projectKey = this.route.snapshot.paramMap.get('projectKey')!;
    if (!taskId || !projectKey) return;
    const projectId = this.resolveProjectId(projectKey);
    console.log("projectid"+projectId);
    if(projectId) {
    this.taskService.getTask(projectId, taskId).subscribe(task => {
      this.task = task;
    })
    }
  }

  private resolveProjectId(projectKey: string): string | null {
    let projectId = this.projectCache.getProjectId(projectKey);
    if (!projectId && !this.projectCache.hasProjectId(projectKey)) {
      this.projectCache.populateProjectIdIfMissing(projectKey);
      projectId = this.projectCache.getProjectId(projectKey);
    }
    return projectId ?? null;
  }

  testCeva(file : File) {
    console.log("From Taskcomponent"+ file.name);
  }
}
