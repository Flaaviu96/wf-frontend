import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { enviroment } from '../../../enviroment';
import { Task } from '../../../models/task.model';
import { map, Observable } from 'rxjs';
import { Comment } from '../../../models/comment.model';

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

}
