import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { enviroment } from '../../../enviroment';
import { Task } from '../../../models/task.model';
import { from, Observable } from 'rxjs';
import { Comment } from '../../../models/comment.model';
import { TaskPatch } from '../../../models/taskpatch.model';
import { Attachment } from '../../../models/attachment.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private apiService: ApiService) {}

  getTask(projectId : string, taskId : string) :Observable<Task>{
    const url = enviroment.apiTaskUrl(projectId, taskId);
    return this.apiService.get<Task>(url, {withCredentials: true});
  }

  updateComment(projectId : string, taskId : string, comment : Comment) :Observable<Comment> {
    const url = enviroment.apiCommentUrl(projectId, taskId);
    return this.apiService.patch<Comment>(url, comment, {withCredentials: true})
  }

  saveComment(projectId : string, taskId : string, comment : Comment) : Observable<Comment> {
    const url = enviroment.apiCommentUrl(projectId, taskId);
    return this.apiService.post<Comment>(url, comment, {withCredentials: true});
  }

  updateTaskMetadata(projectId : string, taskId : string, patch : TaskPatch) : Observable<TaskPatch> {
    const url = enviroment.apiTaskMetadataUrl(projectId, taskId);
    return this.apiService.patch<TaskPatch>(url, patch, {withCredentials: true});
  }

  uploadAttachmentStream(projectId: string, taskId: string, file: File): Observable<Attachment> {
    const url = enviroment.apiAttachmentsUrl(projectId, taskId);
    const formData = new FormData();
    formData.append('file', file);
    return this.apiService.post<Attachment>(url, formData, {withCredentials: true});
  }

  deleteAttachment(projectId: string, taskId: string, attachmentId: string): Observable<any> {
    const url = enviroment.apiAttachmentUrl(projectId, taskId, attachmentId);
    return this.apiService.delete(url, {withCredentials: true});
  }

  downloadAttachment(projectId: string, taskId: string, attachmentId: number): Observable<any> {
    const url = enviroment.apiAttachmentUrl(projectId, taskId, attachmentId);
    return this.apiService.get(url, {withCredentials: true, responseType: 'blob', observe: 'response'});
  }
}
