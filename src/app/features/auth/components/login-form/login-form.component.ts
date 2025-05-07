import { Component, EventEmitter, Input, Output} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginRequest } from '../../../../models/loginRequest.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-form',
  imports: [FormsModule, CommonModule],
  standalone: true,
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
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
