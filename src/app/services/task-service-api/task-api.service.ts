import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../../enviroment';
import { Task } from '../../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http : HttpClient) { }

  getTasks(projectNumber : number) : Observable<Task[]> {
    return this.http.get<Task[]>(enviroment.apiTaskUrl(projectNumber), {withCredentials : true})
  }
}
