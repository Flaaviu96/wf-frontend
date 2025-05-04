import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginFormComponent } from "./features/auth/components/login-form/login-form.component";
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoginFormComponent],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'workforge-front';
}
