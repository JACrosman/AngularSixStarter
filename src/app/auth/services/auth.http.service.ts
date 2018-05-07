import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpService } from '../../shared';
import { Authenticate, User } from '../models';

/**
 * Service - AuthService
 *
 * All authentication and user actions
 */
@Injectable()
export class AuthHttpService {
  constructor(
    private httpService: HttpService
  ) { }

  /**
   * Determine if the user is already logged in
   */
  loadUser(): Observable<User> {
    return this.httpService.get('/user/me');
  }

  /**
   * Authenticate user request
   */
  login(authenticate: Authenticate): Observable<User> {
    return this.httpService.post('/user/login', authenticate);
  }

  /**
   * Logout user
   */
  logout(): void {
  }
}
