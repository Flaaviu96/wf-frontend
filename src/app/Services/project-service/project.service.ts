import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '../../models/project.model';
import { Observable } from 'rxjs/internal/Observable';
import { enviroment } from '../../enviroment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http : HttpClient) { }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(enviroment.apiProjectUrl, { withCredentials: true });
  }

  getProjectWithAllTasks(projectId : string) : Observable<Project> {
    return this.http.get<Project>(`${enviroment.apiProjectUrl}/${projectId}/tasks`, { withCredentials: true });
  }
}
