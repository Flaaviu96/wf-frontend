import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  get<T>(url: string, p0: { withCredentials: boolean; }) : Observable<T> {
    return this.http.get<T>(url, p0);
  }

  post<T>(url : string, body : any, options : {withCredentials : boolean}) : Observable<T> {
    return this.http.post<T>(url, body, options);
  }
}
