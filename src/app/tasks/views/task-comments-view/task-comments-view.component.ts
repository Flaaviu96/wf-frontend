import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import {
  Comment as AppComment,
} from '../../../models/comment.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-comments-view',
  imports: [CommonModule, FormsModule],
  templateUrl: './task-comments-view.component.html',
  styleUrl: './task-comments-view.component.css',
})
export class TaskCommentsViewComponent {
  @Input() hasWritePermission: boolean = false;
  @Input() comments: AppComment[] = [];
  @Input() editingCommentId : number | null = 0;
  @Input() editingCommentContent : string = '';

  @Output() saveNewComment = new EventEmitter<string>();
  @Output() editComment = new EventEmitter<number>();
  @Output() saveUpdatedComment = new EventEmitter<{commentId: number, content: string}>();
  @Output() commentChange = new EventEmitter<string>();
  @Output() cancelEditingComment = new EventEmitter<boolean>();

  comment : string = '';
}
