import { Component } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { Project } from '../../models/project.model';
import { ProjectCardComponent } from '../project-card/project-card.component';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../../Services/project-service/project.service';


@Component({
  selector: 'app-main-page',
  imports: [CommonModule, NavBarComponent, ProjectCardComponent],
  standalone: true,
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {

  projects : Project[] = []

  constructor(private projectService : ProjectService) {}

  ngOnInit() : void {
    this.getAvailableProjects();
    console.log(this.projects);
  }

  getAvailableProjects() {
    this.projectService.getProjects().subscribe({
      next : (data : Project[]) =>{
        this.projects = data;
      },
      error: (err) => {
        console.error("Error loading projects"+err);
      }
    })
  }
}
