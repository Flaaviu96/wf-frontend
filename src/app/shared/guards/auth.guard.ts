import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../login/services/auth.service';
import { inject } from '@angular/core';
import { combineLatest, map, take } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return combineLatest([authService.loginStatus, authService.initializedStatus]).pipe(
    take(1),
    map(([isLoggedIn, isInitialized]) => {
      if (!isInitialized) return false;
      if (!isLoggedIn) {
        router.navigate(['']);
        return false;
      }

      return true;
    })
  )
};