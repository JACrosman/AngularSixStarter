import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { SharedModule } from '../shared';
import { routes } from './auth.routes';

import { AuthInterceptor, AuthHttpService, AuthGuard, AuthStateService } from './services';
import { LoginContainerComponent } from './containers/login.container';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';

export const ENTRY_COMPONENTS = [
];

export const COMPONENTS = [
  ...ENTRY_COMPONENTS,
  LoginContainerComponent,
  LoginComponent
];

@NgModule({
  imports: [
    ReactiveFormsModule,
    RouterModule.forChild(routes),

    SharedModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
  entryComponents: ENTRY_COMPONENTS
})
export class AuthModule {
  static forRoot() {
    return {
      ngModule: AuthModule,
      providers: [
        AuthInterceptor,
        AuthHttpService,
        AuthGuard,
        AuthStateService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true
        }
      ]
    };
  }
}
