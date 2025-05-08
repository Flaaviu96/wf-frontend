import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-project-card',
  imports: [],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.css'
})
export class ProjectCardComponent {
  @Input() project : Project = {
     id : 0,
     projectName : '',
     projectDescription : '',
     workflowId : 0,
 }

 constructor(private route : Router) {}

 viewProject() {
  this.route.navigate(['/viewProject', this.project.id]);
 }
}
