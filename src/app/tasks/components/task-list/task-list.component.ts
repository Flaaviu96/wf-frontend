import { Component } from '@angular/core';
import { WorkflowService } from '../../../shared/services/workflow/workflow.service';
import { ActivatedRoute } from '@angular/router';
import { TaskListViewComponent } from '../task-list-view/task-list-view.component';
import { TaksListService } from '../../services/task-list/taks-list.service';
import { ProjectCacheService } from '../../../shared/services/project-cache/project-cache.service';
import { filter, switchMap, tap } from 'rxjs';
import { TaskFilter } from '../../../models/taskFilter.model';
import { TaskSummaryDTO } from '../../../models/taskSummaryDTO.model';
import { PageResultDTO } from '../../../models/pageResultDTO.model';
@Component({
  selector: 'app-task-list',
  imports: [TaskListViewComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {
  state: string[] = [];
  pageResult : PageResultDTO<TaskSummaryDTO> | null = null;
  projectKey = '';
  constructor(
    private workflowService : WorkflowService,
    private route: ActivatedRoute,
    private taskListService : TaksListService
  ) {}

  ngOnInit() {
    this.fetchWorkflow();
  }


  fetchWorkflow() {
    this.projectKey = this.route.snapshot.paramMap.get('projectKey')!;
    this.workflowService.getAllTheFromStates(this.projectKey).subscribe(state =>
      this.state = state
    )
  }

  filterTasks(taskFilter : TaskFilter) {
    this.taskListService.filterTasks(this.projectKey, taskFilter).subscribe(page =>{
      this.pageResult = page
    }
     );
  }
}
