import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task',
  imports: [],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {

  constructor(private taskService : TaskService, private route: ActivatedRoute) {}

  ngOnInit() {
    const taskId = this.route.snapshot.paramMap.get('id')!;
    this.getTasksGrouped(taskId)
  }

  getTasksGrouped(taskId : string) {
  }
}
