import { Component } from '@angular/core';
import { RouterModule} from '@angular/router';
import { AuthService } from './login/services/auth.service';
import { NavBarComponent } from './ui-templates/nav-bar/nav-bar.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterModule, NavBarComponent],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'workforge-front';
  isLoggedIn : boolean = false;

  constructor(private authService : AuthService){}

  ngOnInit() {
    this.authService.loginStatus.subscribe((status : boolean) => {
      this.isLoggedIn = status;
    })
  }
}
