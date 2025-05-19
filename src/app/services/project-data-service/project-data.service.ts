import { Injectable } from '@angular/core';
import { Task } from '../../models/task.model';
import { Project } from '../../models/project.model';
import { map, Observable } from 'rxjs';
import { ProjectService } from '../project-service-api/project-api.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectDataService {

  constructor(private projectServiceApi : ProjectService) { }

  getTasksGroupedByState(projectKey : string) : Observable<Record<string, Task[]>> {
    return this.projectServiceApi.getProjectWithAllTasks(projectKey).pipe(
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
    return this.projectServiceApi.getProjects();
  }
}
