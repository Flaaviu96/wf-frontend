import { Component } from '@angular/core';
import { WorkflowService } from '../../../shared/services/workflow/workflow.service';
import { ActivatedRoute } from '@angular/router';
import { TaksListService } from '../../services/task-list/taks-list.service';
import { TaskFilter } from '../../../models/task/taskFilter.model';
import { TaskSummaryDTO } from '../../../models/task/taskSummaryDTO.model';
import { PageResultDTO } from '../../../models/pageResultDTO.model';
import { TaskListViewComponent } from '../../views/task-list-view/task-list-view.component';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-task-list',
  imports: [TaskListViewComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})
export class TaskListComponent {
  state: string[] = [];
  taskFilter: FormGroup;
  pageResult: PageResultDTO<TaskSummaryDTO> | null = null;
  projectKey = '';
  currentPage: number = 0;
  constructor(
    private workflowService: WorkflowService,
    private route: ActivatedRoute,
    private taskListService: TaksListService,
    private fb: FormBuilder
  ) {
    this.taskFilter = this.fb.group({
      taskName: [],
      state: [],
      createdDateFrom: [],
      createdDateTo: [],
      assignedTo: [],
    });
  }

  ngOnInit() {
    this.fetchWorkflow();
  }

  fetchWorkflow() {
    this.projectKey = this.route.snapshot.paramMap.get('projectKey')!;
    this.workflowService
      .getAllTheFromStates(this.projectKey)
      .subscribe((state) => (this.state = state));
  }

  filterTasks(taskFilter: TaskFilter) {
    console.log(this.taskFilter.value);
    if (this.currentPage === 0) {
      const taskFilter: TaskFilter = {
        ...this.taskFilter.value,
        firstSearch: true,
      };
    }
    this.taskListService
      .filterTasks(this.projectKey, taskFilter)
      .subscribe((page) => {
        this.pageResult = page;
      });
  }

  nextPage(next: boolean) {
    console.log(this.taskFilter.value);
    const lastTask = next
      ? this.pageResult?.nextCursorId
      : this.pageResult?.prevCursorId;

    let taskFilter: TaskFilter = this.taskFilter.value;
    taskFilter = {
      ...taskFilter,
      cursorTaskId: lastTask,
      nextPage: next,
    };
    this.filterTasks(taskFilter);
    next? this.currentPage ++ : this.currentPage --;
  }
}
