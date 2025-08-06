import { Routes } from '@angular/router';
import { authGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () =>
            import("./login/login.module").then(m => m.LoginModule)
    },
    {
        path: 'projects',
        loadChildren: () =>
            import("./projects/projects.module").then(m => m.ProjectsModule),
        canActivate: [authGuard]
    },
    {
        path: 'tasks',
        loadChildren: () =>
            import("./tasks/tasks.module").then(m => m.TasksModule),
        canActivate: [authGuard]
    }
];