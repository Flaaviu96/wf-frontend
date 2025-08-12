import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { enviroment } from '../../../enviroment';
import { Task } from '../../../models/task/task.model';
import { map, Observable, switchMap } from 'rxjs';
import { Comment } from '../../../models/comment.model';
import { TaskPatchRequest } from '../../../models/task/taskpatchRequest.model';
import { Attachment } from '../../../models/attachment.model';
import { ProjectCacheService } from '../../../shared/services/project-cache/project-cache.service';
import { TaskContextService } from '../context/task-context.service';
import { State } from '../../../models/state';
import { WorkflowService } from '../../../shared/services/workflow/workflow.service';
import { TaskPatchResponse } from '../../../models/task/taskpatchResponse.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(
    private apiService: ApiService,
    private projectCache: ProjectCacheService,
    private context : TaskContextService,
    private workflow : WorkflowService
  ) { }

  getTask(projectKey: string, taskId: string): Observable<{ task: Task, states: State[] }> {
    return this.projectCache.getProjectId(projectKey).pipe(
      switchMap(projectId => {
        this.context.setProjectAndTaskKey(projectId.toString(), taskId);
        const url = enviroment.apiTaskUrl(projectId, taskId);
        return this.apiService.get<Task>(url, { withCredentials: true }).pipe(
          map(task => ({projectId, task}))
        );
      }),
      switchMap(({projectId, task}) => 
        this.workflow.getStatesForProject(projectId, task.state).pipe(
          map(states => ({task, states}))
        )
      )
    )
  }

  updateTaskMetadata(patch: TaskPatchRequest): Observable<TaskPatchResponse> {
    const { projectKey, taskKey } = this.context.getProjectAndTaskKeys();
    const url = enviroment.apiTaskMetadataUrl(projectKey, taskKey);
    return this.apiService.patch<TaskPatchResponse>(url, patch, { withCredentials: true });
  }
}
