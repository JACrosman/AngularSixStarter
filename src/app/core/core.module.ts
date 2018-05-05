import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CoreComponent } from './components/core/core.component';
import { CoreContainerComponent } from './containers/core.container';
import { SharedModule } from '../shared';
import { CoreStateService } from './services/core.state.service';

export const ENTRY_COMPONENTS = [
];

export const COMPONENTS = [
  ...ENTRY_COMPONENTS,
  CoreContainerComponent,
  CoreComponent
];

@NgModule({
  imports: [
    RouterModule.forRoot([], { useHash: true }),

    SharedModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
  entryComponents: ENTRY_COMPONENTS
})
export class CoreModule {
  static forRoot() {
    return {
      ngModule: CoreModule,
      providers: [
        CoreStateService
      ]
    };
  }
}
