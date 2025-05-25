import { Component, inject } from '@angular/core';
import { Project } from '../../../models/project.model';
import { ProjectService } from '../../services/project.service';
import { ProjectCardComponent } from '../project-card/project-card.component';
import { CommonModule } from '@angular/common';
import {MatDialog} from '@angular/material/dialog';
import { ProjectCreateDialogComponent } from '../project-create-dialog/project-create-dialog.component';
@Component({
  selector: 'app-project-list',
  imports: [ProjectCardComponent, CommonModule],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css'
})
export class ProjectListComponent {
  readonly dialog = inject(MatDialog);
  projects : Project[] = []

  constructor(private projectService : ProjectService) {}

  ngOnInit() : void {
    this.getAvailableProjects();
  }

  getAvailableProjects() {
    this.projectService.getAvailableProjects().subscribe({
      next : (data : Project[]) =>{
        this.projects = data;
      },
      error: (err) => {
        console.error("Error loading projects"+err);
      }
    })
  }

  createNewProject() {
    this.dialog.open(ProjectCreateDialogComponent, {
      width: '500px'
    });
  }
}
