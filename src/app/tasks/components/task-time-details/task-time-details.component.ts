import { Component, EventEmitter, Input } from '@angular/core';
import { Taskmetadata } from '../../../models/task.metadata.model';
import { CommonModule } from '@angular/common';
import { UserSearchSelectComponent } from '../../../shared/components/user-search-select/user-search-select.component';
import { TaskContextService } from '../../services/context/task-context.service';
import { TaskPatch } from '../../../models/taskpatch.model';
import { Subject, takeUntil } from 'rxjs';
@Component({
  selector: 'app-task-time-details',
  imports: [CommonModule,
    UserSearchSelectComponent
  ],
  templateUrl: './task-time-details.component.html',
  styleUrl: './task-time-details.component.css'
})
export class TaskTimeDetailsComponent {
  @Input() taskMetadata : Taskmetadata | null = null;
  @Input() time? : {createdDate : Date, modifiedDate : Date};
  isEditing : boolean = false;
  uuid : string = '';
  private destroy = new Subject<void>();
  constructor(private taskContext : TaskContextService) {}

  assignNewUser() {
    this.isEditing = true;
  }

  ngOnInit() {
    console.log("Task-time init");
    this.taskContext.dualChanges.getListen().listener
    .pipe(takeUntil(this.destroy))
    .subscribe(([taskPatch, option])=> {
      if (option !== "task-time") return;
      this.taskMetadata = {
        ...this.taskMetadata,
        ...taskPatch.taskMetadataDTO
      } as Taskmetadata
    })
  }

  handleUserSelection(uuid : string) {
    this.uuid = uuid;
    this.isEditing = false;
    const taskPatch : TaskPatch = {
      userUUID: uuid
    }
    this.taskContext.dualChanges.getIntent().add([taskPatch, "task-time"]);
  }
}
