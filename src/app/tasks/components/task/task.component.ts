import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { TaskService } from '../../services/task/task.service';
import { ActivatedRoute } from '@angular/router';
import { Task } from '../../../models/task/task.model';
import { TaskContextService } from '../../services/context/task-context.service';
import { Subject, takeUntil } from 'rxjs';
import { Comment } from '../../../models/comment.model';
import { TaskPatchRequest } from '../../../models/task/taskpatchRequest.model';
import { WorkflowService } from '../../../shared/services/workflow/workflow.service';
import { State } from '../../../models/state';
import { Attachment } from '../../../models/attachment.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PermissionType } from '../../../models/permission-type.model';
import { TaskOperation } from '../../../models/task/taskOperation.model';
import { TaskViewComponent } from '../../views/task-view/task-view.component';
import { Taskmetadata } from '../../../models/task/task.metadata.model';
import { TaskPatchResponse } from '../../../models/task/taskpatchResponse.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-task',
  imports: [TaskViewComponent, CommonModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent implements OnInit, OnDestroy {
  private snackBar = inject(MatSnackBar);
  task!: Task;
  states: State[] = [];
  private destroy = new Subject<void>();
  taskForm!: FormGroup;
  tempFields: { [key: string]: string } = {};
  hasWritePermission: boolean = false;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private context: TaskContextService,
    private workflowService: WorkflowService,
    private fb: FormBuilder
  ) { }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  ngOnInit() {
    this.getTask();
    this.listenAttachments();
  }

  saveField(payload: { field: string; value: string }) {
    this.taskForm.get(payload.field)?.disable();
    const patch: TaskPatchRequest = {};
    switch (payload.field) {
      case 'taskMetadataDTO.description':
        patch.taskMetadataDTO = patch.taskMetadataDTO ?? {};
        patch.taskMetadataDTO.description = payload.value;
        break;
      case 'taskName':
        patch.taskName = payload.value;
        break;
    }
    this.updateTask(patch);
  }

  cancelEditing(field: string) {
    this.taskForm.get(field)?.setValue(this.tempFields[field]);
    this.taskForm.get(field)?.disable();
  }

  enableEditing(event: { field: string; value: string }) {
    this.tempFields[event.field] = event.value;
    this.taskForm.get(event.field)?.enable();
  }

  updateTaskFromTaskPatch(taskpatch: TaskPatchResponse) {
    if (taskpatch.taskName !== undefined)
      this.task.taskName = taskpatch.taskName;
    if (taskpatch.state !== undefined) {
      this.task.state = taskpatch.state;
      this.taskForm.get('state')?.setValue(taskpatch.state);
    }
    if (taskpatch.taskMetadataDTO !== undefined) {
      this.task.taskMetadataDTO = {
        ...this.task.taskMetadataDTO,
        ...this.pickDefined(taskpatch.taskMetadataDTO),
      } as Taskmetadata;
    }
  }

  stateChange(value: string) {
    const patch: TaskPatchRequest = {
      fromState: this.task.state,
      toState: value
    };
    this.updateTask(patch);
  }

  updateTask(taskpatch: TaskPatchRequest) {
    this.taskService.updateTaskMetadata(taskpatch).subscribe({
      next: (taskpatchResponse) => {
        this.updateTaskFromTaskPatch(taskpatchResponse);
        this.showSuccess("Task updated");
      },
      error: (err) => {
        this.resetField(this.findField(taskpatch));
        this.showFailed("Cannot update the task");
      }
    });
  }

  findField(_taskPatch: TaskPatchRequest) {
    let foundFields: string[] = [];

    const find = (_taskPatch: TaskPatchRequest, prefix = '') => {
      Object.entries(_taskPatch).forEach(([key, value]) => {

        if (value !== undefined && value !== null && typeof value !== 'object') {
          const fieldName = prefix ? `${prefix}.${key}` : key;
          foundFields.push(fieldName);
        }
        else if (value && typeof value === 'object') {
          const newPrefix = prefix ? `${prefix}.${key}` : key;
          find(value, newPrefix);
        }
      });
    }
    find(_taskPatch);
    return foundFields[0];
  };

  resetField(field: string) {
    switch (field) {
      case 'taskMetadataDTO.description':
        this.taskForm.get('taskMetadataDTO.description')?.setValue(this.tempFields[field]);
        break;
      case 'taskname':
        this.taskForm.get('taskname')?.setValue(this.tempFields[field]);
        break;
    }
  }

  pickDefined<T>(obj: Partial<T>): Partial<T> {
    const result: Partial<T> = {};
    for (const key in obj) {
      if (obj[key] !== undefined) {
        result[key] = obj[key];
      }
    }
    return result;
  }

  getTask() {
    const combinedId = this.route.snapshot.paramMap.get('combinedId')!;
    const [projectKey, taskId] = combinedId.split('-');
    if (!taskId || !projectKey) return;
    this.taskService.getTask(projectKey, taskId).subscribe({
      next: ({ task, states }) => {
        this.initializeTask(task, states);
      },
      error: (err) => {
        this.showFailed("Cannot loading the task");
        console.error('Error loading task', err);
      }
    });

  }

  initializeTask(task: Task, states: State[]): void {
    this.task = task;
    this.buildFormGroup();
    this.states = states;
    this.hasWritePermission = this.task.permissionTypes.includes(
      PermissionType.WRITE
    );
    this.listenComment();
    this.listenAttachments();
  }

  buildFormGroup() {
    this.taskForm = this.fb.group({
      taskName: [{ value: this.task.taskName ?? '', disabled: true }],
      state: [this.task.state ?? ''],
      createdDate: [
        this.task.createdDate ?? new Date().toISOString().split('T')[0],
      ],
      modifiedDate: [
        this.task.modifiedDate ?? new Date().toISOString().split('T')[0],
      ],
      taskMetadataDTO: this.fb.group({
        description: [
          {
            value: this.task.taskMetadataDTO?.description ?? '',
            disabled: true,
          },
        ],
        assignedTo: [this.task.taskMetadataDTO?.assignedTo ?? ''],
      }),
    });
  }

  getStates(projectId: number, fromState: string) {
    this.workflowService
      .getStatesForProject(projectId, fromState)
      .subscribe((states) => {
        this.states = states;
      });
  }

  listenComment() {
    this.context.streamComment.outputStream.listener
    .pipe(takeUntil(this.destroy))
    .subscribe(([isListening]) => {
      this.handleSignal(isListening);
    })
  }

  private handleSignal(isListening : boolean) {
    if (isListening === true && this.task.commentDTOS) {
      this.context.streamComment.inputStream.add([{comments: this.task.commentDTOS, hasPermissions: this.hasWritePermission}]);
    }
  }

  listenAttachments() {
    this.context.streamAttachment.outputStream.listener
      .pipe(takeUntil(this.destroy))
      .subscribe(([isListening]) => {
        this.handleAttachmentSignal(isListening);
      });
  }

  handleAttachmentSignal(isListening : boolean) {
    if (isListening === true && this.task.attachmentDTOS) {
      this.context.streamAttachment.inputStream.add([{attachments: this.task.attachmentDTOS, hasPermissions: this.hasWritePermission}]);
    }
  }

  showSuccess(message: string) {
    this.snackBar.open(message, undefined, {
      panelClass: ['bg-green-500', 'text-white', 'font-bold'],
      duration: 3000
    });
  }

  showFailed(message: string) {
    this.snackBar.open(message, undefined, {
      panelClass: ['bg-red-500', 'text-white', 'font-bold'],
      duration: 3000
    });
  }
}
