import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  get(
    url: string,
    options: {
      responseType: 'blob';
      observe: 'response';
      withCredentials?: boolean;
      params?: { [key: string]: string };
    }
  ): Observable<Blob>;

  get<T>(
    url: string,
    options?: { withCredentials?: boolean; params?: { [key: string]: string } }
  ): Observable<T>;

  get<T>(url: string, options: any = {}): Observable<any> {
    return this.http.get(url, options);
  }

  post<T>(
    url: string,
    body: any,
    options: { withCredentials: boolean }
  ): Observable<T> {
    return this.http.post<T>(url, body, options);
  }

  patch<T>(
    url: string,
    body: any,
    options: { withCredentials: boolean }
  ): Observable<T> {
    return this.http.patch<T>(url, body, options);
  }

  delete(url: string, options: { withCredentials: boolean }): Observable<any> {
    return this.http.delete(url, options);
  }
}
