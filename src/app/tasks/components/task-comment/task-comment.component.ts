import { Component, inject, Input, OnInit } from '@angular/core';
import { Comment } from '../../../models/comment.model';
import { TaskContextService } from '../../services/context/task-context.service';
import { TaskOperation } from '../../../models/task/taskOperation.model';
import { TaskCommentsViewComponent } from '../../views/task-comments-view/task-comments-view.component';
import { CommentService } from '../../services/comment/comment.service';
import { take } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-task-comment',
  imports: [TaskCommentsViewComponent],
  templateUrl: './task-comment.component.html',
  styleUrl: './task-comment.component.css',
})
export class TaskCommentComponent implements OnInit {
  private snackBar = inject(MatSnackBar);
  hasWritePermission: boolean = false;
  comments: Comment[] = [];
  tempComment: string = '';
  editingCommentId: number | null = null;

  constructor(
    private taskContext: TaskContextService,
    private commentService: CommentService
  ) { }

  ngOnInit(): void {
    this.listenComments();
    this.sendSignal();
  }

  listenComments() {
    this.taskContext.streamComment.inputStream.listener.pipe(
      take(1))
      .subscribe(([{comments, hasPermissions}]) => {
        this.handleComment(comments);
        this.hasWritePermission = hasPermissions;
      })
  }

  sendSignal() {
    this.taskContext.streamComment.outputStream.add([true]);
  }


  editComment(commentId: number) {
    const comment = this.comments.find((comment) => comment.id === commentId);
    if (comment) {
      this.tempComment = comment?.content;
      this.editingCommentId = commentId;
    }
  }

  cancelEditing() {
    this.editingCommentId = null;
    this.tempComment = '';
  }

  saveComment(commentContent: string) {
    console.log(commentContent);
    if (commentContent.length > 0) {
      let comment: Comment = {
        content: commentContent,
        author: 'dicas',
        id: 0,
      };
      this.commentService.saveComment(comment).subscribe({
        next: (commentRes) => {
          this.handleNewCommentOrUpdated(commentRes);
          this.showSuccess("The comment was added");
        },
        error: (err) => {
          this.showFailed("Cannot save the comment");
        }
      })
    }
  }

  updateComment(payload: { commentId: number; content: string }) {
    const comment = this.comments.find(
      (comment) => comment.id === payload.commentId
    );
    if (comment) {
      comment.content = payload.content;
      this.commentService.updateComment(comment).subscribe({
        next: (commentRes) => {
          this.handleNewCommentOrUpdated(commentRes);
          this.showSuccess("The comment was updated");
        },
        error: (err) => {
          this.showFailed("The comment cannot be updated");
        }
      })
      this.editingCommentId = 0;
      this.tempComment = '';
    }
  }

  handleComment(comments: Comment[]) {
    if (comments.length > 0) {
       comments.sort((a, b) => {
        const timeA = a.modifiedDate ? new Date(a.modifiedDate).getTime() : 0;
        const timeB = b.modifiedDate ? new Date(b.modifiedDate).getTime() : 0;
        return timeB - timeA;
      });
      this.comments = comments;
    }
  }

  handleNewCommentOrUpdated(comment: Comment) {
    const index = this.comments.findIndex((c) => c.id === comment.id);
    if (index !== -1) {
      this.comments[index] = comment;
    } else {
      this.comments.unshift(comment);
    }
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
