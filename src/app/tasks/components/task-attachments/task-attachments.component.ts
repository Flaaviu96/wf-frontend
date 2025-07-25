import { Component, Input, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Attachment } from '../../../models/attachment.model';
import { TaskContextService } from '../../services/context/task-context.service';
import { Subject, takeUntil } from 'rxjs';
@Component({
  selector: 'app-task-attachments',
  imports: [CommonModule],
  templateUrl: './task-attachments.component.html',
  styleUrl: './task-attachments.component.css'
})
export class TaskAttachmentsComponent implements OnDestroy {
  @Input() hasWritePermission : boolean = false;
  @Input() attachments : Attachment[] = [];
  private destroy = new Subject<void>();

  constructor(private taskContext : TaskContextService) {}

  ngOnInit() {
    this.taskContext.dualAttachment.getListen().listener.pipe(
      takeUntil(this.destroy)
    ).subscribe( ([attachment, file]) => {
      this.attachments.unshift(attachment);
    })
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const DUMMY_ATTACHMENT : Attachment = {
        id : 0,
        fileName : ''
      }

     this.taskContext.dualAttachment.getIntent().add([DUMMY_ATTACHMENT, file, "add"]);
    }
    input.value = '';
  }

  deleteAttachment(attachmentId : number) {
    const attachment = this.attachments.find(att => att.id === attachmentId);
    const emptyFile = new File([new Blob()], "empty.txt");
    if (attachment) {
      this.taskContext.dualAttachment.getIntent().add([attachment, emptyFile, "delete"]);
      const index = this.attachments.findIndex(att => att.id === attachmentId);
      if (index !== -1) {
        console.log('index', index);
        this.attachments.splice(index, 1);
    }
  }
} 
  downloadAttachment(attachmentId : number) {
    const att = this.attachments.find(att => att.id === attachmentId);
    const emptyFile = new File([new Blob()], "empty.txt");
    if (att) {
       this.taskContext.dualAttachment.getIntent().add([att, emptyFile, "download"]);
    }
  }
}
