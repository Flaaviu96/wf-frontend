import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { enviroment } from '../../../enviroment';
import { Task } from '../../../models/task.model';
import { map, Observable, switchMap } from 'rxjs';
import { Comment } from '../../../models/comment.model';
import { TaskPatch } from '../../../models/taskpatch.model';
import { Attachment } from '../../../models/attachment.model';
import { ProjectCacheService } from '../../../shared/services/project-cache/project-cache.service';
import { TaskContextService } from '../context/task-context.service';
import { State } from '../../../models/state';
import { WorkflowService } from '../../../shared/services/workflow/workflow.service';

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

  updateComment(projectId: string, taskId: string, comment: Comment): Observable<Comment> {
    const url = enviroment.apiCommentUrl(projectId, taskId);
    return this.apiService.patch<Comment>(url, comment, { withCredentials: true })
  }

  saveComment(projectId: string, taskId: string, comment: Comment): Observable<Comment> {
    const url = enviroment.apiCommentUrl(projectId, taskId);
    return this.apiService.post<Comment>(url, comment, { withCredentials: true });
  }

  updateTaskMetadata(projectId: string, taskId: string, patch: TaskPatch): Observable<TaskPatch> {
    const url = enviroment.apiTaskMetadataUrl(projectId, taskId);
    return this.apiService.patch<TaskPatch>(url, patch, { withCredentials: true });
  }

  uploadAttachmentStream(projectId: string, taskId: string, file: File): Observable<Attachment> {
    const url = enviroment.apiAttachmentsUrl(projectId, taskId);
    const formData = new FormData();
    formData.append('file', file);
    return this.apiService.post<Attachment>(url, formData, { withCredentials: true });
  }

  deleteAttachment(projectId: string, taskId: string, attachmentId: number): Observable<any> {
    const url = enviroment.apiAttachmentUrl(projectId, taskId, attachmentId);
    return this.apiService.delete(url, { withCredentials: true });
  }

  downloadAttachment(projectId: string, taskId: string, attachmentId: number): Observable<any> {
    const url = enviroment.apiAttachmentUrl(projectId, taskId, attachmentId);
    return this.apiService.get(url, { withCredentials: true, responseType: 'blob', observe: 'response' });
  }
}
