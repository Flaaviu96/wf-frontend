import { Component } from '@angular/core';
import { Project } from '../../../models/project.model';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-project-list',
  imports: [],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css'
})
export class ProjectListComponent {

  projects : Project[] = []

  constructor(private projectService : ProjectService) {}

  ngOnInit() : void {
    this.getAvailableProjects();
    console.log(this.projects);
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
}
