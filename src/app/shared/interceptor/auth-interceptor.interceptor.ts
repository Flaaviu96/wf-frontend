import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { AuthService } from '../../login/services/auth.service';
import { inject } from '@angular/core';
import { tap } from 'rxjs';
import { Router } from '@angular/router';

export const authInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const route = inject(Router);
  return next(req).pipe(
    tap(event => {
      if (event instanceof HttpResponse) {
        if (event.status === 403) {
          authService.setLoggedIn(false);
          authService.setInitialized(true);
          route.navigateByUrl('');
        }
      }
    })
  )
};
