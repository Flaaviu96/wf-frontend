import { Component, Input } from '@angular/core';
import { Task } from '../../../models/task.model';
import { PanelBoardComponent } from '../../../shared/components/panel-board/panel-board.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-project-view',
  imports: [PanelBoardComponent, CommonModule],
  templateUrl: './project-view.component.html',
  styleUrl: './project-view.component.css',
})
export class ProjectViewComponent {
  @Input() projectData: { projectName: string, tasksGroupedByState: Record<string, Task[]> } | null = null;
  @Input() projectId : string = '';
  constructor(private route : Router) {}
  
  hasTasks(): boolean {
  return Object.values(this.projectData?.tasksGroupedByState || {}).some(
    (tasks) => tasks.length > 0
  );
}

  taskClicked(taskId : number) {
    this.route.navigate(['tasks', this.projectId, 'viewTask', taskId]);
  }
}
