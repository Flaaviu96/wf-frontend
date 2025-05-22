import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LoginRequest } from '../../../models/loginRequest.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-login-view',
  imports: [FormsModule, CommonModule],
  templateUrl: './login-view.component.html',
  styleUrl: './login-view.component.css'
})
export class LoginViewComponent {
  loginRequest: LoginRequest = {
    username: '',
    password: ''

  }

  @Output() submitForm = new EventEmitter<LoginRequest>();

  @Input() loginFailed: boolean = false;

  onSubmit() {
    this.submitForm.emit(this.loginRequest);
  }
}
