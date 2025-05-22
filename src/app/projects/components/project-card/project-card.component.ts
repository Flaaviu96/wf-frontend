import { Component, Input } from '@angular/core';
import { Project } from '../../../models/project.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-card',
  imports: [],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.css'
})
export class ProjectCardComponent {
  @Input() project : Project = {
    id: 0,
    projectName: '',
    projectDescription: '',
    workflowId: 0,
  }

 constructor(private route : Router) {}

 viewProject() {
  this.route.navigate(['projects/viewProject', this.project.id]);
 }
}
