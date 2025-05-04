import { Component, EventEmitter, Output} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  imports: [FormsModule],
  standalone: true,
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  email: string = '';
  password: string = '';
  remember: boolean = false;

  @Output() submitForm = new EventEmitter<{ email: string; password: string; remember: boolean }>();

  onSubmit() {
    console.log('Form Submitted');
    console.log('Email:', this.email);
    console.log('Password:', this.password);
    console.log('Remember:', this.remember);
    this.email = "aaaaaaaaaaa";
  }
}
