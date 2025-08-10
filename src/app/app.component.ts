import { Component } from '@angular/core';
import { RouterModule} from '@angular/router';
import { AuthService } from './login/services/auth.service';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from "./shared/components/nav-bar/nav-bar.component";
import { MatSnackBarModule } from '@angular/material/snack-bar';
@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterModule, NavBarComponent, MatSnackBarModule],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'workforge-front';

  constructor(private authService : AuthService){}

  ngOnInit() {
    this.authService.initAuthCheck();
  }
}
