import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class AttachmentService {

  constructor(private http : ApiService) { }

  uploadAttachment(file : File, projectId : string, taskId : string) {
    const formData = new FormData();
    
  }
}
