import { Component } from '@angular/core';
import { TaskService } from '../../services/task/task.service';
import { ActivatedRoute } from '@angular/router';
import { Task } from '../../../models/task.model';
import { TaskViewComponent } from "../task-view/task-view.component";

@Component({
  selector: 'app-task',
  imports: [TaskViewComponent],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {
  task : Task | null = null;
  private file : File | null = null;
  private projectId : string | null = null;
  constructor(private taskService : TaskService, private route: ActivatedRoute) {}

  ngOnInit() {
    const taskId = this.route.snapshot.paramMap.get('taskId')!;
    this.projectId = this.route.snapshot.paramMap.get('projectId')!;
    this.taskService.getTask(this.projectId, taskId).subscribe({
       next: (task : Task) => {
        this.task = task;
      },
      error: (err) => {
        console.error('Failed to fetch project tasks', err);
      },
    });
  }

  testCeva(file : File) {
    console.log("From Taskcomponent"+ file.name);
  }
}
