import { Component } from '@angular/core';
import { RouterModule} from '@angular/router';
import { LoginComponent } from "./features/auth/pages/login/login.component";
import { CommonModule } from '@angular/common';
import { NavBarComponent } from "./ui-templates/nav-bar/nav-bar.component";
import { MainPageComponent } from "./ui-templates/main-page/main-page.component";
import { ProjectViewComponent } from './ui-templates/project-view/project-view.component';
import { AuthDataService } from './services/auth-data-service/auth-data.service';
@Component({
  selector: 'app-root',
  imports: [LoginComponent, NavBarComponent, RouterModule, CommonModule, MainPageComponent, RouterModule, ProjectViewComponent],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'workforge-front';
  isLoggedIn : boolean = false;

  constructor(private authService : AuthDataService){}

  ngOnInit() {
    this.authService.loginStatus.subscribe((status : boolean) => {
      this.isLoggedIn = status;
    })
  }
}
