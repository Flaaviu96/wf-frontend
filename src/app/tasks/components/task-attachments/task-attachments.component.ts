import { Component, inject, Input, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Attachment } from '../../../models/attachment.model';
import { TaskContextService } from '../../services/context/task-context.service';
import { Subject, take, takeUntil } from 'rxjs';
import { TaskOperation } from '../../../models/task/taskOperation.model';
import { TaskAttachmentViewComponent } from '../../views/task-attachment-view/task-attachment-view.component';
import { AttachmentService } from '../../services/attachment/attachment.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-task-attachments',
  imports: [CommonModule, TaskAttachmentViewComponent],
  templateUrl: './task-attachments.component.html',
  styleUrl: './task-attachments.component.css',
})
export class TaskAttachmentsComponent {
  @Input() hasWritePermission: boolean = false;
  private snackBar = inject(MatSnackBar);
  attachments: Attachment[] = [];
  private destroy = new Subject<void>();

  constructor(private taskContext: TaskContextService,
    private attachementService: AttachmentService
  ) { }

  ngOnInit() {
    this.listenAttachments();
    this.sendSignal();
  }

  sendSignal() {
    this.taskContext.streamAttachment.outputStream.add([true]);
  }

  listenAttachments() {
    this.taskContext.streamAttachment.inputStream.listener
      .pipe(take(1))
      .subscribe({
        next: ([{attachments, hasPermissions}]) => {
          this.handleAttachments(attachments);
          this.hasWritePermission = hasPermissions;
        },
        error: (err) => {
          this.showFailed("Cannot load the attachments");
        }
      })
  }

  handleAttachments(attachments: Attachment[]) {
    if (attachments?.length > 0) {
      this.attachments = attachments;
    }
  }


  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement | null;

    if (input && input.files && input.files.length > 0) {
      const file = input.files[0];
      this.attachementService.uploadAttachment(file).subscribe({
        next: (value) => {
          this.uploadAttachment(value);
          this.showSuccess("Attachment uploaded");
        },
        error: (err) => {
          this.showFailed("Attachment failed to upload");
        }
      })
    }

    if (input) {
      input.value = '';
    }
  }

  uploadAttachment(attachment: Attachment) {
    this.attachments.unshift(attachment);
  }

  deleteAttachment(attachmentId: number) {
    const attachment = this.attachments.find((att) => att.id === attachmentId);
    if (attachment) {
      this.attachementService.deleteAttachment(attachment.id).subscribe({
        next: () => console.log('Delete successful'),
        error: (err) => {
          console.log('Backend error occured: ', err);
        },
      });
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
      this.attachementService.downloadAttachment(attachmentId).subscribe({
        next: (response) => {
          const blob = response.body!;
          const contentDisposition = response.headers.get('Content-Disposition');
          const filename = this.extractFilenameFromContentDisposition(contentDisposition);
          this.downloadBlob(blob, filename);
        },
        error: (err) => {
          console.error('Download failed:', err);
          this.showFailed("Cannot download");
        }
      });

    }
  }

  private downloadBlob(blob: Blob, filename: string): void {
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = filename;

    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
  }

  extractFilenameFromContentDisposition(header: string | null): string {
    if (!header) return 'downloaded-file';
    const match = header.match(/filename="?([^"]+)"?/);
    return match && match[1] ? match[1] : 'downloaded-file';
  }

  showSuccess(message: string) {
    this.snackBar.open(message, undefined, {
      panelClass: ['bg-green-500', 'text-white', 'font-bold'],
      duration: 3000
    });
  }

  showFailed(message: string) {
    this.snackBar.open(message, undefined, {
      panelClass: ['bg-red-500', 'text-white', 'font-bold'],
      duration: 3000
    });
  }
}
