import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { TaskAttachmentsComponent } from '../../components/task-attachments/task-attachments.component';
import { TaskCommentComponent } from '../../components/task-comment/task-comment.component';
import { State } from '../../../models/state';
import { Attachment } from '../../../models/attachment.model';
import { Comment as AppComment, Comment } from '../../../models/comment.model';
import { UserSearchSelectComponent } from '../../../shared/components/user-search-select/user-search-select.component';

@Component({
  selector: 'app-task-view',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TaskAttachmentsComponent,
    TaskCommentComponent,
    UserSearchSelectComponent
],
  templateUrl: './task-view.component.html',
  styleUrl: './task-view.component.css',
})
export class TaskViewComponent {
  @Input() taskForm!: FormGroup;
  @Input() possibleStates: State[] = [];
  @Input() isEditable: boolean = false;
  @Input() hasWritePermission: boolean = false;
  @Input() taskDetails?: {
    commentDTOS: Comment[];
    attachmentDTOS: Attachment[];
  };

  @Output() stateChange = new EventEmitter<string>();
  @Output() saveField = new EventEmitter<{ field: string; value: string }>();
  @Output() cancelEditing = new EventEmitter<string>();
  @Output() enableEditing = new EventEmitter<{field: string; value: string}>();

  isEditing(field: string): boolean {
    return this.taskForm.get(field)?.enabled || false;
  }

  onStateChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    if (selectElement?.value) {
      this.stateChange.emit(selectElement.value);
    }
  }

  get taskMetadataFormGroup(): FormGroup | null {
    const ctrl = this.taskForm?.get('taskMetadataDTO');
    return ctrl instanceof FormGroup ? ctrl : null;
  }
}
