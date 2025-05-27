import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  get<T>(url: string, options: { withCredentials: boolean; params?: { [key: string]: string } }): Observable<T> {
    return this.http.get<T>(url, options);
}

  post<T>(url : string, body : any, options : {withCredentials : boolean}) : Observable<T> {
    return this.http.post<T>(url, body, options);
  }
}
