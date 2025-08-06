import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of } from 'rxjs';
import { ApiService } from '../../core/services/api.service';
import { LoginRequest } from '../../models/loginRequest.model';
import { enviroment } from '../../enviroment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInSubject = new BehaviorSubject<boolean>(false);
  private isInitialized = new BehaviorSubject<boolean>(false);
  loginStatus = this.loggedInSubject.asObservable();
  initializedStatus = this.isInitialized.asObservable();

  constructor(private apiService: ApiService) { }

  authenticate(loginRequest: LoginRequest): Observable<String> {
    return this.apiService.post<string>(enviroment.apiAuthenticateUrl, loginRequest, { withCredentials: true });
  }

  checkSession(): Observable<boolean> {
    console.log("Ddd");
    return this.apiService.get<boolean>(enviroment.apiCheckSession, { withCredentials: true }).pipe(
      catchError(err => {
        return of(false);
      })
    );
  }

  initAuthCheck(): void {
    this.checkSession().subscribe({
      next: (isLoggedIn) => {
        this.setLoggedIn(isLoggedIn);
        this.setInitialized(true);
      },
      
      error: () => {
        this.setLoggedIn(false);
        this.setInitialized(true);
      }
    }
    )
  }

  setLoggedIn(status: boolean) {
    console.log("Setting", status);
    this.loggedInSubject.next(status);
  }

  setInitialized(status : boolean) {
    this.isInitialized.next(status);
  }

  login() {
    this.loggedInSubject.next(true);
  }
}
