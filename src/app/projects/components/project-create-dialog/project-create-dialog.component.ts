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
@Component({
  selector: 'app-project-create-dialog',
  imports: [       MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule],
  templateUrl: './project-create-dialog.component.html',
  styleUrl: './project-create-dialog.component.css'
})
export class ProjectCreateDialogComponent {
  projectForm : FormGroup
  constructor(
     public dialogRef: MatDialogRef<ProjectCreateDialogComponent>,
    private fb : FormBuilder
  ) {
    this.projectForm = this.fb.group({
      projectName: ['', Validators.required],
      projectDescription: [''],
      projectOwner : ['', Validators.required]
    })
  }

  createProject() {
    this.dialogRef.close(this.projectForm.value);
  }
}
