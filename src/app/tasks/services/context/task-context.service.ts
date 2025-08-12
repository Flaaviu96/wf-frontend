import { Injectable } from '@angular/core';
import { Comment } from '../../../models/comment.model';
import { Attachment } from '../../../models/attachment.model';
import { StreamService } from '../StreamService';
import { TaskOperation } from '../../../models/task/taskOperation.model';
import { EventStream } from '../event-stream';

@Injectable({
  providedIn: 'root'
})
export class TaskContextService {
  private currentProjectKey : string = '';
  private currentTaskKey : string = '';
  streamComment = new StreamService<[payload: {comments: Comment[], hasPermissions: boolean}], [isListening: boolean]>();
  streamAttachment = new StreamService<[payload: {attachments: Attachment[], hasPermissions: boolean}], [isListening: boolean]>();

  constructor() { }

  setCurrentProjectKey(currentProjectKey : string) {
    this.currentProjectKey = currentProjectKey;
  }

  setCurrentTaskKey(currentTaskKey : string) {
    this.currentTaskKey = currentTaskKey;
  }

  setProjectAndTaskKey(currentProjectKey : string, currentTaskKey : string) {
    this.setCurrentProjectKey(currentProjectKey);
    this.setCurrentTaskKey(currentTaskKey);
  }

  getProjectAndTaskKeys() : {projectKey: string; taskKey: string} {
    return {
      projectKey : this.currentProjectKey,
      taskKey : this.currentTaskKey
    }
  }
}
