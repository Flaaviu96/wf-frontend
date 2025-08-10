import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TaskSummaryDTO } from '../../../models/task/taskSummaryDTO.model';
@Component({
  selector: 'app-task-card-view',
  imports: [CommonModule],
  templateUrl: './task-card-view.component.html',
  styleUrl: './task-card-view.component.css'
})
export class TaskCardViewComponent {
  @Input() taskSummary : TaskSummaryDTO | null = null;
  @Input() projectKey = '';

  constructor(private route : Router) {}

  viewTask() {
    this.route.navigate(['tasks', this.projectKey, 'viewTask', this.projectKey+"-"+this.taskSummary?.taskId]);
  }
}
