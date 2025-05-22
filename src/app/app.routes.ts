import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () =>
            import("./login/login.module").then(m => m.LoginModule)
    },
    {
        path: 'projects',
        loadChildren: () =>
            import("./projects/projects.module").then(m => m.ProjectsModule)
    },
    {
        path: 'tasks',
        loadChildren: () =>
            import("./tasks/tasks.module").then(m => m.TasksModule)
    }
];
