import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { map, Observable } from 'rxjs';
import { Task } from '../../models/task.model';
import { enviroment } from '../../enviroment';
import { Project } from '../../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private apiService : ApiService) { }

    getTasksGroupedByState(projectKey : string) : Observable<Record<string, Task[]>> {
    return this.getProjectWithTasks(projectKey).pipe(
      map((project : Project) => {
        const tasks = project.tasks ?? [];
        return tasks.reduce((result: Record<string, Task[]>, task: Task) => {
          const state = task.state;
           (result[state] = result[state] || []).push(task);
           return result;
        }, {} as Record<string, Task[]>);
      })
    );
  }

  getAvailableProjects() : Observable<Project[]> {
    return this.getProjects();
  }

  getProjectWithTasks(projectKey :  string) : Observable<Project> {
    return this.apiService.get<Project>(`${enviroment.apiProjectUrl}/${projectKey}/tasks`);
  }

  getProjects() : Observable<Project[]> {
    return this.apiService.get<Project[]>(enviroment.apiProjectUrl);
  }
}
