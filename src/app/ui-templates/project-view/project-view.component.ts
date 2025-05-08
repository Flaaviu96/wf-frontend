import { Component, Input } from '@angular/core';
import { Task } from '../../models/task.model';
import { ProjectService } from '../../Services/project-service/project.service';
import { PanelBoardComponent } from '../panel-board/panel-board.component';
import { CommonModule } from '@angular/common';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-project-view',
  imports: [PanelBoardComponent, CommonModule],
  templateUrl: './project-view.component.html',
  styleUrl: './project-view.component.css'
})
export class ProjectViewComponent {
  groupedByState = new Map<string, Task[]>();
  @Input() project : Project | null = null;

  constructor(
    private projectService : ProjectService,

  ) {}
}
