import { Component, Input } from '@angular/core';
import { Task } from '../../../models/task/task.model';
import { PanelBoardViewComponent } from '../panel-board-view/panel-board-view.component';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CdkDrag, CdkDragDrop, CdkDropList, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-project-view',
  imports: [PanelBoardViewComponent, CommonModule, RouterModule, CdkDropList, CdkDrag],
  templateUrl: './project-view.component.html',
  styleUrl: './project-view.component.css',
})
export class ProjectViewComponent {
  @Input() tasksGroupedByState: Record<string, Task[]> | null = null;

  @Input() projectKey: string = '';
  constructor(private route: Router) {}

  hasTasks(): boolean {
    return Object.values(this.tasksGroupedByState || {}).some(
      (tasks) => tasks.length > 0
    );
  }


 get connectedLists(): string[] {
  return this.tasksGroupedByState ? Object.keys(this.tasksGroupedByState) : [];
}


  onTaskDropped(event: CdkDragDrop<Task[]>) {
    const prevList = event.previousContainer.data;
    const currList = event.container.data;
    console.log(event.previousContainer.id);
    if (event.previousContainer === event.container) {
      moveItemInArray(currList, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(prevList, currList, event.previousIndex, event.currentIndex);
    }
  }


  taskClicked(taskId: number) {
    this.route.navigate(['tasks', this.projectKey, 'viewTask', this.projectKey+"-"+taskId]);
  }
}
