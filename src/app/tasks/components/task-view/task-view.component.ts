import { Component, Input, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../../models/task.model';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PermissionType } from '../../../models/permission-type.model';
import { TaskCommentsViewComponent } from '../task-comments-view/task-comments-view.component';
import { TaskTimeDetailsComponent } from '../task-time-details/task-time-details.component';
import { TaskAttachmentsComponent } from '../task-attachments/task-attachments.component';
import { TaskContextService } from '../../services/context/task-context.service';
import { Subject, takeUntil } from 'rxjs';
import { TaskPatch } from '../../../models/taskpatch.model';
import { State } from '../../../models/state';
@Component({
  selector: 'app-task-view',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TaskCommentsViewComponent,
    TaskTimeDetailsComponent,
    TaskAttachmentsComponent,
  ],
  templateUrl: './task-view.component.html',
  styleUrl: './task-view.component.css'
})
export class TaskViewComponent {
  taskForm!: FormGroup;
  @Input() possibleStates: State[] = [];
  editingFields: { [keys: string]: boolean } = {};
  tempFields: { [keys: string]: string } = {};
  private destroy = new Subject<void>();
  @Input() taskDetails!: Task;
  selectedFileName: string | null = null;
  hasWritePermission: boolean = true;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['taskDetails'] && this.taskDetails) {
      this.taskForm = this.fb.group({
        taskName: [{ value: this.taskDetails.taskName ?? '', disabled: true }],
        state: [this.taskDetails.state ?? ''],
        taskMetadataDTO: this.fb.group({
          description: [{ value: this.taskDetails.taskMetadataDTO?.description ?? '', disabled: true }],
          assignedTo: [this.taskDetails.taskMetadataDTO?.assignedTo ?? '']
        })
      })
      this.hasWritePermission = this.taskDetails.permissionTypes.includes(PermissionType.WRITE);
    }
  }

  get taskMetadataFormGroup(): FormGroup | null {
    const ctrl = this.taskForm?.get('taskMetadataDTO');
    return ctrl instanceof FormGroup ? ctrl : null;
  }


  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }

  ngOnInit() {
    this.listenChanges();
  }

  listenChanges() {
    this.taskContext.dualChanges.getListen().listener
      .pipe(takeUntil(this.destroy))
      .subscribe(([taskPatch, option]) => {
        if (option !== "task-view") return;
        this.taskDetails = {
          ...this.taskDetails,
          ...taskPatch
        } as Task
      })
  }

  constructor(private taskContext: TaskContextService, private fb: FormBuilder) {
  }

  onStateChange(event: Event): void {
    const selectedState = (event.target as HTMLSelectElement).value;
    const state = this.possibleStates.find(state => state.name === selectedState)?.name;
    const patch: TaskPatch = {
      fromState: this.taskDetails.state,
      toState: state
    }
    this.taskContext.dualChanges.getIntent().add([patch, "task-view"]);
  }

  enableEditing(field: string): void {
    this.taskForm.get('taskMetadataDTO.description')?.enable();
    this.editingFields[field] = true;
    switch (field) {
      case "description":
        const taskMetadata = this.taskDetails.taskMetadataDTO;
        if (taskMetadata) {
          this.tempFields[field] = this.taskDetails.taskMetadataDTO!.description;
        }
        break;
      case "taskName":
        this.tempFields[field] = this.taskDetails.taskName;
        break;
    }
  }

  isEditing(field: string): boolean {
    return this.editingFields[field];
  }

  disableEditing(field: string): void {
    this.editingFields[field] = false;
    switch (field) {
      case "description":
        const taskMetadata = this.taskDetails.taskMetadataDTO;
        if (taskMetadata) {
          this.taskDetails.taskMetadataDTO!.description = this.tempFields[field];
        }
        break;
      case "taskName":
        this.taskDetails.taskName = this.tempFields[field];
        break;
    }
  }

  saveChange(value: string, fieldName: string) {
    this.disableEditing(fieldName);
    const patch: TaskPatch = {};
    switch (fieldName) {
      case "description":
        patch.taskMetadataDTO = patch.taskMetadataDTO ?? {};
        patch.taskMetadataDTO.description = value;
        break;
      case "taskName":
        patch.taskName = value;
        break;
    }
    this.taskContext.dualChanges.getIntent().add([patch, "task-view"]);
  }
}
