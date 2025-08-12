import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ProjectCreateViewComponent } from "../../views/project-create-view/project-create-view.component";

@Component({
  selector: 'app-project-create',
  imports: [ProjectCreateViewComponent],
  templateUrl: './project-create.component.html',
  styleUrl: './project-create.component.css',
})
export class ProjectCreateComponent {
  readonly dialog = inject(MatDialog);
  projectForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.projectForm = this.fb.group({
      projectName: ['', Validators.required],
      projectDescription: [''],
      projectOwner: ['', Validators.required],
    });
  }

  newProject() {
    console.log(this.projectForm.value);
  }
}
