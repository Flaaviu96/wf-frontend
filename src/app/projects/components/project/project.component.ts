import { Component } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { ProjectViewComponent } from '../project-view/project-view.component';
import { Task } from '../../../models/task.model';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../../../models/project.model';

@Component({
  selector: 'app-project',
  imports: [ProjectViewComponent],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css',
})
export class ProjectComponent {
 projectData: { projectName: string, tasksGroupedByState: Record<string, Task[]> } | null = null;
 projectId : string = '';
  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('projectId')!;
    if (id) {
      this.projectId = id;
      this.getProjectWithTasks(this.projectId);
    }
  }

  getProjectWithTasks(projectId: string): void {
    this.projectService.getTasksGroupedByState(projectId).subscribe({
      next: (data) => {
        this.projectData = data;
      },
      error: (err) => {
        console.error('Failed to fetch project tasks', err);
      },
    });
  }
}