import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, filter } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { Authenticate, User } from '../models';
import { AuthState, Login, Logout, LoadUser } from '../state';

/**
 * Service - AuthService
 *
 * All authentication and user actions
 */
@Injectable()
export class AuthStateService {
constructor(
  private store: Store,
  private router: Router
) {}

  /**
   * Authenticate the user
   * @param authenticate
   */
  login(authenticate: Authenticate) {
    this.store.dispatch(new Login(authenticate));
  }

  /**
   * Logout the user
   */
  logout() {
    this.store.dispatch(new Logout());
  }

  /**
   * Redirect user to the login page
   */
  loginRedirect() {
    this.router.navigate(['auth', 'login']);
  }

  /**
   * Determine if the user is already logged in
   */
  isLoggedIn() {
    return !!this.getToken();
  }

  /**
   * Access user auth token
   */
  getToken(): string {
    return this.store.selectSnapshot(AuthState.token);
  }

  /**
   * Get the current login error message
   */
  getLoginError(): Observable<string> {
      return this.store.select(AuthState.error);
  }

  /**
   * Get the current user
   */
  getUser(): Observable<User> {
      this.store.selectOnce(AuthState.user).subscribe((existingUser) => {
            if (!existingUser) {
                this.store.dispatch(new LoadUser());
            }
      });

      return this.store.select(AuthState.user);
  }
}
