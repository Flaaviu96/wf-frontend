import { Injectable } from '@angular/core';
import { Comment } from '../../../models/comment.model';
import { DualStream } from '../dual-stream';
import { Taskmetadata } from '../../../models/task.metadata.model';
import { TaskPatch } from '../../../models/taskpatch.model';

@Injectable({
  providedIn: 'root'
})
export class TaskContextService {
  private currentProjectKey : string = '';
  private currentTaskKey : string = '';
  dualComment = new DualStream<[Comment, boolean]>();
  dualChanges = new DualStream<[TaskPatch]>();

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
