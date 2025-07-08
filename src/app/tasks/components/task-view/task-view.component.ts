import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../../models/task.model';
import { FormsModule } from '@angular/forms';
import { PermissionType } from '../../../models/permission-type.model';
import { TaskCommentsViewComponent } from '../task-comments-view/task-comments-view.component';
import { TaskTimeDetailsComponent } from '../task-time-details/task-time-details.component';
import { TaskAttachmentsComponent } from '../task-attachments/task-attachments.component';
@Component({
  selector: 'app-task-view',
  imports: [
    CommonModule,
    FormsModule,
    TaskCommentsViewComponent,
    TaskTimeDetailsComponent,
    TaskAttachmentsComponent],
  templateUrl: './task-view.component.html',
  styleUrl: './task-view.component.css'
})
export class TaskViewComponent {
  possibleStates: string[] = ['To Do', 'In Progress', 'Done', 'Testing', 'Blocked'];
  @Input() taskDetails!: Task;
  selectedFileName: string | null = null;
  hasWritePermission: boolean = true;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['taskDetails'] && this.taskDetails) {
      this.hasWritePermission = this.taskDetails.permissionTypes.includes(PermissionType.WRITE);
    }
  }

  constructor() { }

  onStateChange(event: Event): void {
    const selectedState = (event.target as HTMLSelectElement).value;
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.selectedFileName = file.name;
      // this.uploadFile.emit(file);
    }
  }
}
