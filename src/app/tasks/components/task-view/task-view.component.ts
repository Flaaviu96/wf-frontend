import { Component, Input, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../../models/task.model';
import { FormsModule } from '@angular/forms';
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
    TaskCommentsViewComponent,
    TaskTimeDetailsComponent,
    TaskAttachmentsComponent,
  ],
  templateUrl: './task-view.component.html',
  styleUrl: './task-view.component.css'
})
export class TaskViewComponent {
  @Input() possibleStates: State[]= [];
  editingFields : { [keys : string] : boolean} = {};
  tempFields : { [keys : string] : string} = {};
  private destroy = new Subject<void>();
  @Input() taskDetails!: Task;
  selectedFileName: string | null = null;
  hasWritePermission: boolean = true;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['taskDetails'] && this.taskDetails) {
      this.hasWritePermission = this.taskDetails.permissionTypes.includes(PermissionType.WRITE);
    }
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }

  ngOnInit() {
    this.listenChanges();
    console.log(this.possibleStates);
  }

  listenChanges() {
    this.taskContext.dualChanges.getListen().listener
    .pipe(takeUntil(this.destroy))
    .subscribe(([taskPatch]) => {
      this.taskDetails = {
        ...this.taskDetails,
        ...taskPatch
      } as Task
    })
  }

  constructor(private taskContext : TaskContextService) { }

  onStateChange(event: Event): void {
    const selectedState = (event.target as HTMLSelectElement).value;
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.selectedFileName = file.name;
      // this.uploadFile.emit(file);
    }
  }

  enableEditing(field : string) : void {
    this.editingFields[field] = true;
    switch(field) {
      case "description":
        this.tempFields[field] = this.taskDetails.taskMetadataDTO!.description;
        break;
      case "taskName":
        this.tempFields[field] = this.taskDetails.taskName;
        break;
    }
  }

  isEditing(field : string) : boolean {
    return this.editingFields[field];
  }

  disableEditing(field : string) : void {
    this.editingFields[field] = false;
    switch(field) {
      case "description":
        this.taskDetails.taskMetadataDTO!.description = this.tempFields[field];
        break;
      case "taskName":
        this.taskDetails.taskName = this.tempFields[field];
        break;
    }
  }

  saveChange(value : string, fieldName : string) {
    this.disableEditing(fieldName);
    const patch: TaskPatch = {};
    switch(fieldName) {
      case "description":
        patch.taskMetadataDTO = patch.taskMetadataDTO ?? {};
        patch.taskMetadataDTO.description = value;
        break;
      case "state":
        patch.state = value;
        break;
      case "taskName":
        patch.taskName = value;
        break;
    }
    this.taskContext.dualChanges.getIntent().add([patch]);
  }
}
