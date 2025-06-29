import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { map, Observable } from 'rxjs';
import { Project } from '../../models/project.model';
import { Task } from '../../models/task.model';
import { enviroment } from '../../enviroment';
import { createNewProject } from '../../models/createProject.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
constructor(private apiService : ApiService) { }

    getTasksGroupedByState(projectKey : string) :  Observable<{ tasksGroupedByState: Record<string, Task[]> }> {
    return this.getProjectWithTasks(projectKey).pipe(
      map((tasks : Task[]) => {
        const tasksGroupedByState = tasks.reduce((result: Record<string, Task[]>, task: Task) => {
          const state = task.state;
           (result[state] = result[state] || []).push(task);
           return result;
        }, {} as Record<string, Task[]>);
        return {
          tasksGroupedByState
        };
      })
    );
  }

  getAvailableProjects() : Observable<Project[]> {
    return this.getProjects();
  }

  saveNewProject(project : createNewProject) : Observable<Project> {
    return this.apiService.post<Project>(`${enviroment.apiProjectUrl}`, project, {withCredentials: true});
  }

  private getProjectWithTasks(projectKey :  string) : Observable<Task[]> {
    return this.apiService.get<Task[]>(`${enviroment.apiProjectUrl}/${projectKey}/tasks`, {withCredentials: true});
  }

  getProjects() : Observable<Project[]> {
    return this.apiService.get<Project[]>(enviroment.apiProjectUrl, {withCredentials: true});
  }

  getProjectId(projectKey : string) : Observable<string> {
    return this.apiService.get<string>(`${enviroment.apiProjectUrl}/${projectKey}`, {withCredentials: true})
  }
}
