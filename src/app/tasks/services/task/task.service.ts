import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { enviroment } from '../../../enviroment';
import { Task } from '../../../models/task.model';
import { Observable } from 'rxjs';
import { Comment } from '../../../models/comment.model';
import { TaskPatch } from '../../../models/taskpatch.model';

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

}
