import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../../models/task.model';
@Component({
  selector: 'app-task-view',
  imports: [CommonModule],
  templateUrl: './task-view.component.html',
  styleUrl: './task-view.component.css'
})
export class TaskViewComponent {
  possibleStates: string[] = ['To Do', 'In Progress', 'Done', 'Testing', 'Blocked'];
  @Input() taskDetails : Task | null = null;
  
  constructor() { }

  ngOnInit(): void {
  }

  onStateChange(event: Event): void {
    const selectedState = (event.target as HTMLSelectElement).value;
    console.log('Noua stare selectată:', selectedState);
  }
}
