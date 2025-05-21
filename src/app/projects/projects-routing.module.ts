import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { ProjectViewComponent } from './components/project-view/project-view.component';

const routes: Routes = [
  {path: '', component: ProjectListComponent},
  {path: ':id', component: ProjectViewComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
