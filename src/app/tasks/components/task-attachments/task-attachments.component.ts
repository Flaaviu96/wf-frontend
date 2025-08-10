import { Component, Input, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Attachment } from '../../../models/attachment.model';
import { TaskContextService } from '../../services/context/task-context.service';
import { Subject, takeUntil } from 'rxjs';
import { TaskOperation } from '../../../models/task/taskOperation.model';
import { TaskAttachmentViewComponent } from '../../views/task-attachment-view/task-attachment-view.component';
@Component({
  selector: 'app-task-attachments',
  imports: [CommonModule, TaskAttachmentViewComponent],
  templateUrl: './task-attachments.component.html',
  styleUrl: './task-attachments.component.css',
})
export class TaskAttachmentsComponent implements OnDestroy {
  @Input() hasWritePermission: boolean = false;
  attachments: Attachment[] = [];
  private destroy = new Subject<void>();

  constructor(private taskContext: TaskContextService) {}

  ngOnInit() {
    this.listenAttachments();
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }

  sendSignal() {
    this.taskContext.streamAttachment.outputStream.add([{ isListening: true }]);
  }

  listenAttachments() {
    this.taskContext.streamAttachment.inputStream.listener
    .pipe(takeUntil(this.destroy))
    .subscribe(([attachments]) => {
      if (attachments.length > 1) {
        this.attachments = attachments;
      } else {
        const index = this.attachments.findIndex(att => att.id === attachments[0].id);
        if (index !== -1) {
          this.attachments.unshift(attachments[0]);
        }
      }
    })
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement | null;

    if (input && input.files && input.files.length > 0) {
      const file = input.files[0];
      this.taskContext.streamAttachment.outputStream.add([
        { file: file, operation: TaskOperation.Add },
      ]);
    }

    if (input) {
      input.value = '';
    }
  }

  deleteAttachment(attachmentId: number) {
    const attachment = this.attachments.find((att) => att.id === attachmentId);
    if (attachment) {
      this.taskContext.streamAttachment.outputStream.add([
        { attachment: attachment, operation: TaskOperation.Delete },
      ]);
      const index = this.attachments.findIndex(
        (att) => att.id === attachmentId
      );
      if (index !== -1) {
        this.attachments.splice(index, 1);
      }
    }
  }
  downloadAttachment(attachmentId: number) {
    const att = this.attachments.find((att) => att.id === attachmentId);
    if (att) {
      this.taskContext.streamAttachment.outputStream.add([
        { attachment: att, operation: TaskOperation.Download },
      ]);
    }
  }
}
