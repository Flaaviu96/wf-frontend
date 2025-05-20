import { Component, Input } from '@angular/core';
import { Task } from '../../models/task.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-panel-board',
  imports: [CommonModule],
  templateUrl: './panel-board.component.html',
  styleUrl: './panel-board.component.css'
})
export class PanelBoardComponent {
  @Input() tasks : Task[] = [];
  @Input() state : string = '';

  constructor(private route : Router){}

  showTask(taskId: number): void {
  this.route.navigate(['/viewTask', taskId]);
  console.log('Task ID:', taskId);
  // You can also navigate, open a modal, etc.
  // this.router.navigate(['/task', taskId]);
}
}
