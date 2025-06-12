import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {Validators} from '@angular/forms';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserSearchSelectComponent } from "../../../shared/components/user-search-select/user-search-select.component"; 
import { ProjectService } from '../../services/project.service';
import { Project } from '../../../models/project.model';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-project-create-dialog',
  imports: [MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    UserSearchSelectComponent,
    ReactiveFormsModule, UserSearchSelectComponent, CommonModule],
  templateUrl: './project-create-dialog.component.html',
  styleUrl: './project-create-dialog.component.css'
})
export class ProjectCreateDialogComponent {
  projectForm : FormGroup
  errorMessage : string | null = null;
  constructor(
     public dialogRef: MatDialogRef<ProjectCreateDialogComponent>,
    private fb : FormBuilder,
    private projectService : ProjectService
  ) {
    this.projectForm = this.fb.group({
      projectName: ['', Validators.required],
      projectDescription: [''],
      projectOwner : ['', Validators.required]
    })
  }

  createProject() {
    this.projectService.saveNewProject(this.projectForm.value).subscribe({
      next: (dataProject : Project) => {
        this.dialogRef.close(dataProject);
      },
      error: (err) => {
        this.errorMessage = err.error.message;
      }
    })
  }

  selectedProjectOwner(username : string) {
    this.projectForm.patchValue({
      projectOwner : username
    })
  }
}
