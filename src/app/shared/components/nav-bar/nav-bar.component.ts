import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../login/services/auth.service';
@Component({
  selector: 'app-nav-bar',
  imports: [CommonModule, RouterModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  isMenuOpen = false;
  isLoggedIn = false;

  constructor(private serviceAuth : AuthService) {}

  ngOnInit() {
    this.serviceAuth.loginStatus.subscribe(isLoggedIn =>
      this.isLoggedIn = isLoggedIn
    )
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
