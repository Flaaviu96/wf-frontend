import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Project } from '../../../models/project.model';
import { MatDialog } from '@angular/material/dialog';
import { ProjectCreateViewComponent } from '../project-create-view/project-create-view.component';
import { ProjectCardComponent } from '../../components/project-card/project-card.component';
import { CommonModule } from '@angular/common';
import { createNewProject } from '../../../models/createProject.model';

@Component({
  selector: 'app-project-list-view',
  imports: [ProjectCardComponent, CommonModule],
  templateUrl: './project-list-view.component.html',
  styleUrl: './project-list-view.component.css'
})
export class ProjectListViewComponent {
  @Input() projects : Project[] = [];
  @Output() createProject = new EventEmitter<boolean>();
  
}
