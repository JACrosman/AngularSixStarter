import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared';

export const ENTRY_COMPONENTS = [
];

export const COMPONENTS = [
  ...ENTRY_COMPONENTS
];

@NgModule({
  imports: [
    RouterModule,

    SharedModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
  entryComponents: ENTRY_COMPONENTS
})
export class ProjectModule {
  static forRoot() {
    return {
      ngModule: ProjectModule,
      providers: [
      ]
    };
  }
}
