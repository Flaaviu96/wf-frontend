import { Routes } from '@angular/router';
import { MainPageComponent } from './ui-templates/main-page/main-page.component';
import { LoginComponent } from './features/auth/pages/login/login.component';
import { ProjectViewComponent } from './ui-templates/project-view/project-view.component';
import { TaskViewComponent } from './ui-templates/task-view/task-view.component';

export const routes: Routes = [
    {path: '', component: LoginComponent}, 
    {path: 'main', component: MainPageComponent},
    {path: 'viewProject/:id', component: ProjectViewComponent},
    {path: 'viewTask/:id', component:TaskViewComponent},
    {path: '**', redirectTo: '' }
];
