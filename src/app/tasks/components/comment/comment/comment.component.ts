import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Comment as AppComment} from '../../../../models/comment.model';

@Component({
  selector: 'app-comment',
  imports: [CommonModule],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})
export class CommentComponent {
  @Input() appComment : AppComment | null = null;
}
