import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared';
import { routes } from './auth.routes';

export const ENTRY_COMPONENTS = [
];

export const COMPONENTS = [
  ...ENTRY_COMPONENTS
];

@NgModule({
  imports: [
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
      ]
    };
  }
}
