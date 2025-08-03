import { Component, Input } from '@angular/core';
import { TaskSummaryDTO } from '../../../models/taskSummaryDTO.model';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-task-card-view',
  imports: [CommonModule],
  templateUrl: './task-card-view.component.html',
  styleUrl: './task-card-view.component.css'
})
export class TaskCardViewComponent {
  @Input() taskSummary : TaskSummaryDTO | null = null;
}
