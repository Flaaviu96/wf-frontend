import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Comment as AppComment} from '../../../models/comment.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-comments-view',
  imports: [CommonModule, FormsModule],
  templateUrl: './task-comments-view.component.html',
  styleUrl: './task-comments-view.component.css'
})
export class TaskCommentsViewComponent {
  @Input() hasWritePermission : boolean = false;
  @Input() comments : AppComment[] | null = null;
  comment : string = '';
  isEditable : boolean = false;
  editingCommentId: number | null = null;
  
  saveComment() {
  }

 isCommentEditable(commentId: number): boolean {
  return this.editingCommentId === commentId;
}
   editComment(commentId: number) {
  this.editingCommentId = commentId;
 }
}
