import { Component, Input } from '@angular/core';
import { Task } from '../../../models/task.model';

@Component({
  selector: 'app-project-view',
  imports: [],
  templateUrl: './project-view.component.html',
  styleUrl: './project-view.component.css'
})
export class ProjectViewComponent {

  @Input() tasksGroupedByState : Record<string, Task[]> | null = {};

hasTasks(): boolean {
  return Object.values(this.tasksGroupedByState || {}).some(tasks => tasks.length > 0);
}
}
