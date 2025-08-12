import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskCardViewComponent } from '../task-card-view/task-card-view.component';
import { PageResultDTO } from '../../../models/pageResultDTO.model';
import { TaskSummaryDTO } from '../../../models/task/taskSummaryDTO.model';
import { TaskFilter } from '../../../models/task/taskFilter.model';

@Component({
  selector: 'app-task-list-view',
  imports: [ReactiveFormsModule, CommonModule, TaskCardViewComponent],
  templateUrl: './task-list-view.component.html',
  styleUrl: './task-list-view.component.css',
})
export class TaskListViewComponent {
  @Input() taskFilter!: FormGroup;
  @Input() state: string[] = [];
  @Input() projectKey = '';
  @Input() currentPage: number = 0;
  @Input() pageResult: PageResultDTO<TaskSummaryDTO> | null = null;

  @Output() filter = new EventEmitter<TaskFilter>();
  @Output() nextPage = new EventEmitter<boolean>();
}
