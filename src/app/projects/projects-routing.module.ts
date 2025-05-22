import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { ProjectComponent } from './components/project/project.component';

const routes: Routes = [
  {path: '', component: ProjectListComponent},
  {path: 'viewProject/:projectId', component: ProjectComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
