import { Component, Input } from '@angular/core';
import { Taskmetadata } from '../../../models/task.metadata.model';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-task-time-details',
  imports: [CommonModule],
  templateUrl: './task-time-details.component.html',
  styleUrl: './task-time-details.component.css'
})
export class TaskTimeDetailsComponent {
  @Input() taskMetadata : Taskmetadata | null = null;

  ngOnInit() {
    console.log(this.taskMetadata);
  }
}
