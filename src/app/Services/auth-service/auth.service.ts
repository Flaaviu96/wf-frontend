import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { enviroment } from '../../enviroment';
import { LoginRequest } from '../../models/loginRequest.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInSubject = new BehaviorSubject<boolean>(false);
  loginStatus = this.loggedInSubject.asObservable();
  
  constructor(private http : HttpClient) {}

  authenticate(loginRequest : LoginRequest) : Observable<String> {
    return this.http.post<string>(enviroment.apiAuthenticateUrl, loginRequest, {withCredentials: true});
  }

  login() {
    this.loggedInSubject.next(true);
  }
}
