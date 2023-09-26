import { CanActivateFn, Router } from '@angular/router';
import { UserValidationService } from './user-validation.service';
import { inject } from '@angular/core';

export const authguardGuard: CanActivateFn = (route, state) => {
  const userValidation  = inject(UserValidationService)
  const router = inject(Router)

  console.log(userValidation.isAuthenticated());

  return userValidation.isAuthenticated( ) ?  true : router.navigate(['/login']) ;
};
