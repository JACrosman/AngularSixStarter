import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { routerTransition } from '../../shared';
import { Authenticate } from '../models';
import { AuthStateService } from '../services';

@Component({
  selector: 'app-login-container',
  template: `
    <app-login
      (submitted)="onSubmit($event)"
      [errorMessage]="error$ | async">
    </app-login>
  `
})
export class LoginContainerComponent {
  pending$: Observable<boolean>;
  error$: Observable<string>;

  constructor(
    private authService: AuthStateService,
    private router: Router
  ) {
    this.error$ = this.authService.getLoginError();
  }

  onSubmit(auth: Authenticate) {
    this.authService.login(auth);
  }
}
