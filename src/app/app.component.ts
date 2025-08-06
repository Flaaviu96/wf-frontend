import { Component } from '@angular/core';
import { RouterModule} from '@angular/router';
import { AuthService } from './login/services/auth.service';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from "./shared/components/nav-bar/nav-bar.component";
@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterModule, NavBarComponent],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'workforge-front';

  constructor(private authService : AuthService){}

  ngOnInit() {
    console.log('calling');
    this.authService.initAuthCheck();
  }
}
