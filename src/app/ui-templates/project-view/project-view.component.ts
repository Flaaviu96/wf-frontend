import { Component, Input } from '@angular/core';
import { Task } from '../../models/task.model';
import { PanelBoardComponent } from '../panel-board/panel-board.component';
import { CommonModule } from '@angular/common';
import { Project } from '../../models/project.model';
import { ProjectDataService } from '../../services/project-data-service/project-data.service';

@Component({
  selector: 'app-project-view',
  imports: [PanelBoardComponent, CommonModule],
  templateUrl: './project-view.component.html',
  styleUrl: './project-view.component.css'
})
export class ProjectViewComponent {
  @Input() project : Project | null = null;
  tasksGroupedByState: Record<string, Task[]> = {};
  
  constructor(private projectService : ProjectDataService) {}

  getTasks() {
    const projectKey = this.project?.projectKey ?? '';
    if (projectKey) {
      this.projectService.getTasksGroupedByState(projectKey).subscribe({
        next: (taskGrouped) => {
          this.tasksGroupedByState = taskGrouped;
        },

        error: (err) => {
          console.log("error");
        }
      })
    }
  }

  hasTasks() {
    return Object.values(this.tasksGroupedByState).some(tasks => tasks.length > 0);
  }
}
