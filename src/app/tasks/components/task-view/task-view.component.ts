import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../../models/task.model';
import { CommentComponent } from "../comment/comment/comment.component";
@Component({
  selector: 'app-task-view',
  imports: [CommonModule, CommentComponent],
  templateUrl: './task-view.component.html',
  styleUrl: './task-view.component.css'
})
export class TaskViewComponent {
  possibleStates: string[] = ['To Do', 'In Progress', 'Done', 'Testing', 'Blocked'];
  @Input() taskDetails : Task | null = null;
  @Output() uploadFile = new EventEmitter<File>;
  selectedFileName: string | null = null;
  constructor() { }

  ngOnInit(): void {
    console.log(this.taskDetails);
  }

  onStateChange(event: Event): void {
    const selectedState = (event.target as HTMLSelectElement).value;
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.selectedFileName = file.name;
      this.uploadFile.emit(file);
    }
  }
}
