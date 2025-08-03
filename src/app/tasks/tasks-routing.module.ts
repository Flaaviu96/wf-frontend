import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskComponent } from './components/task/task.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskListViewComponent } from './components/task-list-view/task-list-view.component';

const routes: Routes = [
  {
    path: ':projectKey/viewTask/:combinedId' , component: TaskComponent,
  },
  {
    path :':projectKey/taskList', component: TaskListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }
