import { Component } from '@angular/core';

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
    projectKey: ''
  }

 constructor(private route : Router) {}

 viewProject() {
  this.route.navigate(['/viewProject', this.project.id]);
 }
}
