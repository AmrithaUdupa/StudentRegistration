import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateChildFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isLoggedIn = authService.isLoggedIn();
  console.log('authGuard called, isLoggedIn:', isLoggedIn);

  if (isLoggedIn) {
    return true;
  }

  console.log('Redirecting to login');
  alert('Please log in first!');
  router.navigate(['./login']);
  return false;
};
