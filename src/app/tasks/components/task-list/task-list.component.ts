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
  projectId : number = 0;
  pageResult : PageResultDTO<TaskSummaryDTO> | null = null;

  constructor(
    private workflowService : WorkflowService,
    private route: ActivatedRoute,
    private taskListService : TaksListService,
    private projectCacheService : ProjectCacheService
  ) {}

  ngOnInit() {
    this.fetchWorkflow();
  }


  fetchWorkflow() {
    const projectKey = this.route.snapshot.paramMap.get('projectKey')!;
    this.projectCacheService.getProjectId(projectKey).pipe(
      filter(projectId => !!projectId),
      tap(projectId => this.projectId=Number(projectId)),
      switchMap(projectId =>
        this.workflowService.getAllTheFromStates(Number(projectId)).pipe(
          tap(state => {
            this.state = state;
          })
        )
      )
    ).subscribe();
  }

  filterTasks(taskFilter : TaskFilter) {
    if (this.projectId === 0) return;
    console.log(taskFilter);
    this.taskListService.filterTasks(this.projectId, taskFilter).subscribe(page =>{
      this.pageResult = page
    }
     );
  }

}
