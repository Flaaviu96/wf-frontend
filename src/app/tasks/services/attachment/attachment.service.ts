import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { enviroment } from '../../../enviroment';
import { Attachment } from '../../../models/attachment.model';
import { Observable } from 'rxjs';
import { TaskContextService } from '../context/task-context.service';

@Injectable({
  providedIn: 'root'
})
export class AttachmentService {

  constructor(private apiService: ApiService,
    private context: TaskContextService,
  ) { }

  uploadAttachment(file: File): Observable<Attachment> {
    const { projectKey, taskKey } = this.context.getProjectAndTaskKeys();
    const url = enviroment.apiAttachmentsUrl(projectKey, taskKey);
    const formData = new FormData();
    formData.append('file', file);
    return this.apiService.post<Attachment>(url, formData, { withCredentials: true });
  }

  deleteAttachment(attachmentId: number): Observable<any> {
    const { projectKey, taskKey } = this.context.getProjectAndTaskKeys();
    const url = enviroment.apiAttachmentUrl(projectKey, taskKey, attachmentId);
    return this.apiService.delete(url, { withCredentials: true });
  }

  downloadAttachment(attachmentId: number): Observable<any> {
    const { projectKey, taskKey } = this.context.getProjectAndTaskKeys();
    const url = enviroment.apiAttachmentUrl(projectKey, taskKey, attachmentId);
    return this.apiService.get(url, { withCredentials: true, responseType: 'blob', observe: 'response' });
  }
}
