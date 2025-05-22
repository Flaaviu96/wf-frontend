import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from '../../core/services/api.service';
import { LoginRequest } from '../../models/loginRequest.model';
import { enviroment } from '../../enviroment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInSubject = new BehaviorSubject<boolean>(false);
  loginStatus = this.loggedInSubject.asObservable();
  
  constructor(private apiService : ApiService) {}

  authenticate(loginRequest : LoginRequest) : Observable<String> {
    return this.apiService.post<string>(enviroment.apiAuthenticateUrl, loginRequest, {withCredentials: true});
    }
    
    login() {
      this.loggedInSubject.next(true);
    }
}
