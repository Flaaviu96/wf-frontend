import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { map, Observable } from 'rxjs';
import { Project } from '../../models/project.model';
import { Task } from '../../models/task.model';
import { enviroment } from '../../enviroment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

constructor(private apiService : ApiService) { }

    getTasksGroupedByState(projectKey : string) :  Observable<{ projectName: string, tasksGroupedByState: Record<string, Task[]> }> {
    return this.getProjectWithTasks(projectKey).pipe(
      map((project : Project) => {
        console.log("map");
        const tasks = project.tasks ?? [];
        console.log("nume" +project.tasks);
        const tasksGroupedByState = tasks.reduce((result: Record<string, Task[]>, task: Task) => {
          const state = task.state;
           (result[state] = result[state] || []).push(task);
           return result;
        }, {} as Record<string, Task[]>);
        return {
          projectName: project.projectName,
          tasksGroupedByState
        };
      })
    );
  }

  getAvailableProjects() : Observable<Project[]> {
    return this.getProjects();
  }

  private getProjectWithTasks(projectKey :  string) : Observable<Project> {
    return this.apiService.get<Project>(`${enviroment.apiProjectUrl}/${projectKey}/tasks`, {withCredentials: true});
  }

  getProjects() : Observable<Project[]> {
    return this.apiService.get<Project[]>(enviroment.apiProjectUrl, {withCredentials: true});
  }
}
