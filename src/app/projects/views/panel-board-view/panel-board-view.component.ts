import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../../models/task/task.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-panel-board',
  imports: [CommonModule, DragDropModule],
  templateUrl: './panel-board-view.component.html',
  styleUrl: './panel-board-view.component.css',
})
export class PanelBoardViewComponent {
  @Input() tasks: Task[] = [];
  @Input() state: string = '';
  @Input() connectedLists: string[] = [];

  @Output() taskDropped = new EventEmitter<CdkDragDrop<Task[]>>();
  @Output() taskClicked = new EventEmitter<Task>();

  constructor(private route: Router) {}

  getLength(): number {
    return this.tasks.length;
  }

  drop(event: CdkDragDrop<Task[]>) {
    this.taskDropped.emit(event);
  }

  showTask(taskId: number) {
    const task = this.tasks.find((t) => t.id === taskId);
    if (task) {
      this.taskClicked.emit(task);
    }
  }

  get connectedListsExcludingSelf(): string[] {
    return this.connectedLists.filter((s) => s !== this.state);
  }
}
