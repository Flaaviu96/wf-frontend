import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Attachment } from '../../../models/attachment.model';

@Component({
  selector: 'app-task-attachment-view',
  imports: [CommonModule],
  templateUrl: './task-attachment-view.component.html',
  styleUrl: './task-attachment-view.component.css'
})
export class TaskAttachmentViewComponent {
  @Input() attachments : Attachment[] = [];
  @Input() hasWritePermission : boolean = false;

  @Output() downloadAttachment = new EventEmitter<number>();
  @Output() deleteAttachment = new EventEmitter<number>();
  @Output() uploadAttachment = new EventEmitter<Event>();

}
