import { Component } from '@angular/core';
import { LoginRequest } from '../../../models/loginRequest.model';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginViewComponent } from '../login-view/login-view.component';

@Component({
  selector: 'app-login',
  imports: [LoginViewComponent],
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
        this.router.navigateByUrl('/projects');
      },
      error: err => {
        console.error('Login failed', err);
        this.loginFailed = true;
      }
    })
  }
}
