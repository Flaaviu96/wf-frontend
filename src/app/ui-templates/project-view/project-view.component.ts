import { Component, Input } from '@angular/core';
import { Task } from '../../models/task.model';
import { ProjectService } from '../../Services/project-service/project.service';
import { PanelBoardComponent } from '../panel-board/panel-board.component';
import { CommonModule } from '@angular/common';
import { Project } from '../../models/project.model';
import { LocalStorageService } from '../../Services/localStorage-service/local-storage.service';

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
    private localStorageService : LocalStorageService

  ) {}

  ngOnInit() {
    let projectId ='';
    if (this.project) {
      this.localStorageService.save('projectId', this.project?.id);
    } else {
      const projectId = this.localStorageService.load('projectId');
    }

  }

  get hasGroups(): boolean {
    return this.groupedByState && this.groupedByState.size > 0;
  }  
}
