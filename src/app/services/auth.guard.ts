import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const inAuthenticated = authService.isAuthenticated();

  if (inAuthenticated) {
    return true;
  } else {
    console.error('Der Benutzer hat keinen Zugriff auf diese Route');
    router.navigate(['/signup']);
    return false;
  }
};
