import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../../models/task.model';
import { PanelBoardComponent } from '../panel-board/panel-board.component';
import { CommonModule } from '@angular/common';
import { Project } from '../../models/project.model';
import { ProjectDataService } from '../../services/project-data-service/project-data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-view',
  imports: [PanelBoardComponent, CommonModule],
  templateUrl: './project-view.component.html',
  styleUrl: './project-view.component.css'
})
export class ProjectViewComponent implements OnInit{
  @Input() project : Project | null = null;
  tasksGroupedByState: Record<string, Task[]> = {};
  
  constructor(private projectService : ProjectDataService, private route: ActivatedRoute) {}

  ngOnInit() {
    const projectId = this.route.snapshot.paramMap.get('id');
    this.getTasks(projectId);
  }

  getTasks(projectKey : string | null) {
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

  hasTasks() : boolean {
    return Object.values(this.tasksGroupedByState).some(tasks => tasks.length > 0);
  }
}
