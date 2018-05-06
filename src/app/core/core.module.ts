import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

import { CoreComponent } from './components/core/core.component';
import { CoreContainerComponent } from './containers/core.container';
import { SharedModule } from '../shared';
import { CoreStateService } from './services/core.state.service';
import { routes } from './core.routes';
import { CoreState } from './state';

export const ENTRY_COMPONENTS = [
];

export const COMPONENTS = [
  ...ENTRY_COMPONENTS,
  CoreContainerComponent,
  CoreComponent
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true }),

    NgxsModule.forRoot([CoreState]),
    NgxsReduxDevtoolsPluginModule.forRoot(),

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
