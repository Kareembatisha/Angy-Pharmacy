import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../Services/user.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  let _userSerivce = inject(UserService);
  let router = inject(Router);
  if (_userSerivce.isUserLogged) {
    return true;
  } else {
    alert('please Login First');
    router.navigate(['/signin']);
    return false;
  }
};
