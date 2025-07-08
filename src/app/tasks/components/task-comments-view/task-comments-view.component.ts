import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, SimpleChange, SimpleChanges } from '@angular/core';
import { Comment as AppComment, Comment } from '../../../models/comment.model';
import { FormsModule } from '@angular/forms';
import { TaskContextService } from '../../services/context/task-context.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-task-comments-view',
  imports: [CommonModule, FormsModule],
  templateUrl: './task-comments-view.component.html',
  styleUrl: './task-comments-view.component.css',
})
export class TaskCommentsViewComponent implements OnDestroy {
  @Input() hasWritePermission: boolean = false;
  @Input() comments: AppComment[] = [];
  comment: string = '';
  isEditable: boolean = false;
  editingCommentId: number | null = null;
  private destroy = new Subject<void>();

  ngOnInit() {
    this.listenComment();
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }

  constructor(private taskContext : TaskContextService) {}

  saveComment() {
    let comment : Comment = {
      content : this.comment,
      author : "dicas",
      id: 0
    }
    this.taskContext.dualComment.getIntent().add([comment, true]);
  }

  isCommentEditable(commentId: number): boolean {
    return this.editingCommentId === commentId;
  }
  editComment(commentId: number) {
    this.editingCommentId = commentId;
  }

  saveEditedComment(commentId: number) {
    if (this.comments) {
      const comment = this.comments.find((element) => element.id === commentId);
      if (comment) {
        this.taskContext.dualComment.getIntent().add([comment, false]);
        this.editingCommentId = null;
      }
    }
  }

  listenComment() {
    this.taskContext.dualComment.getListen().listener
    .pipe(takeUntil(this.destroy))
    .subscribe(([Comment, result]) => {
      this.handleComment(Comment, result);
    })
  }

  handleComment(comment : Comment, result : boolean) {
    if (comment) {
      const id = this.comments.findIndex(c => c.id === comment.id);
      if (id === -1) {
        this.comments.unshift(comment);
      } else {
        this.comments[id] = comment;
      }
    }
  }

  cancelEditComment() {
    this.editingCommentId = null;
  }
}
