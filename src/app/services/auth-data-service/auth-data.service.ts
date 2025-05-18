import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginRequest } from '../../models/loginRequest.model';
import { AuthService } from '../auth-service-api/auth-api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthDataService {
  private loggedInSubject = new BehaviorSubject<boolean>(false);
  loginStatus = this.loggedInSubject.asObservable();
  
  constructor(private authService : AuthService) {}

  authenticate(loginRequest : LoginRequest) : Observable<String> {
    return this.authService.authenticate(loginRequest);
  }

  login() {
    this.loggedInSubject.next(true);
  }
}
