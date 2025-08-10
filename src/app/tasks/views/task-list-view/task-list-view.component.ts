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

  // constructor(private fb: FormBuilder) {
  //   this.taskFilter = this.fb.group({
  //     taskName: [],
  //     state: [],
  //     createdDateFrom: [],
  //     createdDateTo: [],
  //     assignedTo: [],
  //   });
  // }

  // ngOnChanges(changes: SimpleChanges): void {
  //   if (changes['pageResult'] && this.pageResult?.content) {
  //     if (this.currentPage === 0) {
  //       this.currentPage = 1;
  //     }
  //     if (this.pageResult.hasNextPage) {

  //     }
  //   }
  // }

  // filterTask() {
  //   if (this.currentPage === 0) {
  //     const taskFilter : TaskFilter = {
  //       ...this.taskFilter.value,
  //       firstSearch: true
  //     }
  //     this.filter.emit(taskFilter);
  //   } else {
  //     this.filter.emit(this.taskFilter.value);
  //   }
  // }

  // nextPage(next: boolean) {
  //   const lastTask = next
  //     ? this.pageResult?.nextCursorId
  //     : this.pageResult?.prevCursorId

  //   let taskFilter: TaskFilter = this.taskFilter.value;
  //   taskFilter = {
  //     ...taskFilter,
  //     cursorTaskId: lastTask,
  //     nextPage: next
  //   };
  //   this.filter.emit(taskFilter);
  //   next ? this.currentPage ++ : this.currentPage --;
  // }
}
