import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { UserSearchSelectComponent } from '../../../shared/components/user-search-select/user-search-select.component';
import { CommonModule } from '@angular/common';
import { createNewProject } from '../../../models/createProject.model';
@Component({
  selector: 'app-project-create-view',
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    UserSearchSelectComponent,
    ReactiveFormsModule,
    UserSearchSelectComponent,
    CommonModule,
  ],
  templateUrl: './project-create-view.component.html',
  styleUrl: './project-create-view.component.css',
})
export class ProjectCreateViewComponent {
  @Input() projectForm!: FormGroup;
  @Input() errorMessage: string = '';
  @Output() newProject = new EventEmitter<boolean>();



  selectedProjectOwner(username: string) {
    this.projectForm.patchValue({
      projectOwner: username,
    });
  }
}
