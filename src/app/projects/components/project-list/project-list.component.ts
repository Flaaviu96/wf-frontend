import { Component, inject } from '@angular/core';
import { Project } from '../../../models/project.model';
import { ProjectService } from '../../services/project.service';
import { CommonModule } from '@angular/common';
import { ProjectListViewComponent } from '../../views/project-list-view/project-list-view.component';
import { createNewProject } from '../../../models/createProject.model';
import { MatDialog } from '@angular/material/dialog';
import { ProjectCreateViewComponent } from '../../views/project-create-view/project-create-view.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectCreateComponent } from "../project-create/project-create.component";
@Component({
  selector: 'app-project-list',
  imports: [CommonModule, ProjectListViewComponent, ProjectCreateComponent],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css'
})
export class ProjectListComponent {
  projects : Project[] = []
  enableCreateProjectDialog = false;
  constructor(private projectService : ProjectService) {
  }

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

  createProject() {
    console.log("yyy");
    this.enableCreateProjectDialog = true;
  }

  // private createProject() {
  //   const dialogRef = this.dialog.open(ProjectCreateViewComponent, {
  //     width: '600px'
  //   });
  //   dialogRef.afterClosed().subscribe((newProject : Project) => {
  //     if (newProject) {
  //       this.projectService.saveNewProject(newProject).
  //       //this.projects.push(newProject)
  //     }
  //   })
  // }
}
