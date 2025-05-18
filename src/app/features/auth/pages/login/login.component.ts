import { Component } from '@angular/core';
import { LoginFormComponent } from "../../components/login-form/login-form.component";
import { LoginRequest } from '../../../../models/loginRequest.model';
import { Router } from '@angular/router';
import { AuthDataService } from '../../../../services/auth-data-service/auth-data.service';

@Component({
  selector: 'app-login',
  imports: [LoginFormComponent],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  loginFailed: boolean = false;
  constructor(private authService :  AuthDataService, private router : Router) {}

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
