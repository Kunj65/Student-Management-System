import { inject } from '@angular/core';
import { AuthService } from '../services/auth';

/**
 * APP_INITIALIZER factory function
 * Initializes auth state on app startup before routing
 * This ensures auth state is loaded before any route guards are evaluated
 */
export function initializeAuth() {
  return () => {
    const authService = inject(AuthService);

    // Initialize auth state and return the observable
    // Angular will wait for this to complete before proceeding with app initialization
    return authService.initializeAuth();
  };
}
