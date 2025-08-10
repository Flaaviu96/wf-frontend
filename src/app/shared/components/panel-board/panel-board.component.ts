import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../../models/task/task.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-panel-board',
  imports: [CommonModule],
  templateUrl: './panel-board.component.html',
  styleUrl: './panel-board.component.css'
})
export class PanelBoardComponent {
  @Input() tasks : Task[] = [];
  @Input() state : string = '';
  @Output() taskClicked = new EventEmitter<number>();

  constructor(private route : Router){}

  showTask(taskId: number): void {
    this.taskClicked.emit(taskId);
  }

  getLength() : number {
    return this.tasks.length;
  }
}