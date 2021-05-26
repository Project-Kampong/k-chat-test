import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class OnboardingGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService, private cookieService: CookieService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log(this.authService.getCurrentUserData());
    if (
      !this.authService.getCurrentUserData().is_activated &&
      this.authService.getIsLoggedIn() &&
      this.cookieService.check('token')
    ) {
      return true;
    }
    this.router.navigate(['/home']);
    return false;
  }
}
