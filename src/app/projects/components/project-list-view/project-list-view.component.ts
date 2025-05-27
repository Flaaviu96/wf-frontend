import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Project } from '../../../models/project.model';
import { MatDialog } from '@angular/material/dialog';
import { ProjectCreateDialogComponent } from '../project-create-dialog/project-create-dialog.component';
import { ProjectCardComponent } from '../project-card/project-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-list-view',
  imports: [ProjectCardComponent, CommonModule],
  templateUrl: './project-list-view.component.html',
  styleUrl: './project-list-view.component.css'
})
export class ProjectListViewComponent {
  readonly dialog = inject(MatDialog);
  @Input() projects : Project[] = [];
  @Output() projectCreated = new EventEmitter<Project>();

    createNewProject() {
    const dialogRef = this.dialog.open(ProjectCreateDialogComponent, {
      width: '500px'
    });
    dialogRef.afterClosed().subscribe((newProject : Project) => {
      if(newProject) {
        this.projectCreated.emit(newProject);
      }
    })
  }
}
