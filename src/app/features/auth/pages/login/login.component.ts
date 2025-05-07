import { Component } from '@angular/core';
import { LoginFormComponent } from "../../components/login-form/login-form.component";
import { LoginRequest } from '../../../../models/loginRequest.model';
import { AuthServiceComponent } from '../../../../Services/auth-service/auth-service.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [LoginFormComponent],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  loginFailed: boolean = false;
  constructor(private authService :  AuthServiceComponent, private router : Router) {}

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
