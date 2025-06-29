import { Component } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { ProjectViewComponent } from '../project-view/project-view.component';
import { Task } from '../../../models/task.model';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from "../../../shared/components/nav-bar/nav-bar.component";

@Component({
  selector: 'app-project',
  imports: [ProjectViewComponent, CommonModule, NavBarComponent],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css',
})
export class ProjectComponent {
 tasksGroupedByState: Record<string, Task[]> | null = null;
 projectKey : string = '';
 errorStatus : number = 0;


  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
     this.projectKey = this.route.snapshot.paramMap.get('projectKey')!;
    if (this.projectKey) {
      this.projectService.getProjectId(this.projectKey).subscribe(projectId => {
        this.getProjectWithTasks(projectId);
      })
    }
  }

  getProjectWithTasks(projectId: string): void {
    this.projectService.getTasksGroupedByState(projectId).subscribe({
      next: (reponse) => {
        this.tasksGroupedByState = reponse.tasksGroupedByState;
      },
      error: (err) => {
        this.errorStatus = err.status;
        console.log(this.errorStatus);
      },
    });
  }
}