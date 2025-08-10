import { Component, Input, OnInit } from '@angular/core';
import { Comment } from '../../../models/comment.model';
import { TaskContextService } from '../../services/context/task-context.service';
import { TaskOperation } from '../../../models/task/taskOperation.model';
import { TaskCommentsViewComponent } from '../../views/task-comments-view/task-comments-view.component';
@Component({
  selector: 'app-task-comment',
  imports: [TaskCommentsViewComponent],
  templateUrl: './task-comment.component.html',
  styleUrl: './task-comment.component.css',
})
export class TaskCommentComponent implements OnInit {
  @Input() hasWritePermission: boolean = false;
  comments: Comment[] = [];
  tempComment: string = '';
  editingCommentId: number | null = null;

  constructor(private taskContext: TaskContextService) {}

  ngOnInit(): void {
    this.listenComments();
    this.sendSignal();
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
    let comment: Comment = {
      content: commentContent,
      author: 'dicas',
      id: 0,
    };
    this.taskContext.streamComment.outputStream.add([
      { comment, operation: TaskOperation.Add },
    ]);
  }

  updateComment(payload: { commentId: number; content: string }) {
    const comment = this.comments.find(
      (comment) => comment.id === payload.commentId
    );
    if (comment) {
      comment.content = payload.content;
      this.taskContext.streamComment.outputStream.add([
        { comment, operation: TaskOperation.Update },
      ]);
      this.editingCommentId = 0;
      this.tempComment = '';
    }
  }

  listenComments() {
    this.taskContext.streamComment.inputStream.listener.subscribe(
      ([comments]) => {
        this.handleComment(comments);
      }
    );
  }

  handleComment(comments: Comment[]) {
    if (comments) {
      comments.sort((a, b) => {
        const timeA = a.modifiedDate ? new Date(a.modifiedDate).getTime() : 0;
        const timeB = b.modifiedDate ? new Date(b.modifiedDate).getTime() : 0;
        return timeB - timeA;
      });
      if (comments.length > 1) {
        this.comments = comments;
        return;
      }
      const index = this.comments.findIndex((c) => c.id === comments[0].id);
      if (index !== -1) {
        this.comments[index] = comments[0];
      } else {
        this.comments.unshift(comments[0]);
      }
    }
  }

  sendSignal() {
    this.taskContext.streamComment.outputStream.add([{ isListening: true }]);
  }
}
