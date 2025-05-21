import { Component } from '@angular/core';
import { LoginRequest } from '../../../models/loginRequest.model';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginFailed: boolean = false;
  constructor(private authService :  AuthService, private router : Router) {}

  onLoginSubmit(loginRequest: LoginRequest): void {
    this.authService.authenticate(loginRequest).subscribe({
      next: () => {
        this.authService.login();
        this.router.navigateByUrl('/main');
      },
      error: err => {
        console.error('Login failed', err);
        this.loginFailed = true;
      }
    })
  }
}
