import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ProjectCreateViewComponent } from "../../views/project-create-view/project-create-view.component";
import { Project } from '../../../models/project.model';

@Component({
  selector: 'app-project-create',
  imports: [ProjectCreateViewComponent],
  templateUrl: './project-create.component.html',
  styleUrl: './project-create.component.css',
})
export class ProjectCreateComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  projectForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.projectForm = this.fb.group({
      projectName: ['', Validators.required],
      projectDescription: [''],
      projectOwner: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.createNewProject();
  }

    createNewProject() {
    const dialogRef = this.dialog.open(ProjectCreateViewComponent, {
      width: '600px'
    });
    dialogRef.afterClosed().subscribe((newProject : Project) => {
      if (newProject) {

      }
    })
  }
}
