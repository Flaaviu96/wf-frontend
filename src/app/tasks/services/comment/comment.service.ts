import { Injectable } from '@angular/core';
import { TaskContextService } from '../context/task-context.service';
import { ApiService } from '../../../core/services/api.service';
import { ProjectCacheService } from '../../../shared/services/project-cache/project-cache.service';
import { Observable } from 'rxjs';
import { enviroment } from '../../../enviroment';
import { Comment } from '../../../models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(
        private apiService: ApiService,
        private context : TaskContextService,
  ) {}

    updateComment(comment: Comment): Observable<Comment> {
      const { projectKey, taskKey } = this.context.getProjectAndTaskKeys();
      const url = enviroment.apiCommentUrl(projectKey, taskKey);
      return this.apiService.patch<Comment>(url, comment, { withCredentials: true })
    }
  
    saveComment(comment: Comment): Observable<Comment> {
      const { projectKey, taskKey } = this.context.getProjectAndTaskKeys();
      const url = enviroment.apiCommentUrl(projectKey, taskKey);
      return this.apiService.post<Comment>(url, comment, { withCredentials: true });
    }

}
