import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngxs/store';

import { AuthState } from '../state/auth.state';
import { AuthStateService } from './auth.state.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthStateService) {}
​
  canActivate() {
    const token = this.authService.getToken();
    const isLoggedIn = token !== undefined;

    if (!isLoggedIn) {
      this.authService.loginRedirect();
    }

    return isLoggedIn;
  }
}
