import { Component, inject } from '@angular/core';
import { Project } from '../../../models/project.model';
import { ProjectService } from '../../services/project.service';
import { CommonModule } from '@angular/common';
import { ProjectListViewComponent } from '../project-list-view/project-list-view.component';
import { createNewProject } from '../../../models/createProject.model';
@Component({
  selector: 'app-project-list',
  imports: [CommonModule, ProjectListViewComponent],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css'
})
export class ProjectListComponent {
  projects : Project[] = []
  newProject : createNewProject | null = null;
  constructor(private projectService : ProjectService) {}

  ngOnInit() : void {
    this.getAvailableProjects();
  }

  getAvailableProjects() {
    this.projectService.getAvailableProjects().subscribe({
      next : (data : Project[]) => {
        this.projects = data;
      },
      error: (err) => {
        console.error("Error loading projects"+err);
      }
    })
  }
}
