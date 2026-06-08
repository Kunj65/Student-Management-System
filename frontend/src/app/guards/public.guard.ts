import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';

export const publicGuard: CanActivateFn = async () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Same - wait for auth to finish first
  await authService.initializeAuth();

  if (authService.getAuthState()) {
    return router.createUrlTree(['/students']);
  }

  return true;
};
