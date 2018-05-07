
import { MatSnackBar } from '@angular/material';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { CoreStateService } from '../../core';
import { User } from '../models';
import { AuthHttpService } from '../services/auth.http.service';
import { Login, Logout, LoadUser } from './auth.actions';

export class AuthStateModel {
  token?: string;
  error?: string;
  user?: User;
}

@State<AuthStateModel>({
  name: 'auth'
})
export class AuthState {
  constructor(
    private authService: AuthHttpService,
    private coreService: CoreStateService
  ) { }

  @Selector()
  static token(state: AuthStateModel) { return state.token; }

  @Selector()
  static error(state: AuthStateModel) { return state.error; }

  @Selector()
  static user(state: AuthStateModel) { return state.user; }

  @Action(Login)
  login(ctx: StateContext<AuthStateModel>, action: Login) {
    return this.authService.login(action.payload).pipe(
      tap((result: { token: string }) => {
        ctx.patchState({ token: result.token });
      }),
      catchError(err => {
        ctx.patchState({ error: err });
        return of(err);
      })
    );
  }

  @Action(Logout)
  logout(ctx: StateContext<AuthStateModel>) {
    this.authService.logout();

    ctx.setState({});
  }

  @Action(LoadUser)
  loadUser(ctx: StateContext<AuthStateModel>) {
    return this.authService.loadUser().pipe(
      tap((user: User) => {
        ctx.patchState({ user });
      }),
      catchError(error => of(this.coreService.notificationError('Failed to load projects'))),
    );
  }
}
