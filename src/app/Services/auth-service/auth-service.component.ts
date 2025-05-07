import { HttpClient } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { LoginRequest } from '../../models/loginRequest.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { enviroment } from '../../enviroment';

@Component({
  selector: 'app-auth-service',
  imports: [],
  templateUrl: './auth-service.component.html',
  styleUrl: './auth-service.component.css'
})

@Injectable({
  providedIn: 'root'
})
export class AuthServiceComponent {
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
