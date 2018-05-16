import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';

import { CoreComponent } from './components/core/core.component';
import { CoreContainerComponent } from './containers/core.container';
import { SharedModule, HttpService } from '../shared';
import { CoreStateService } from './services/core.state.service';
import { routes } from './core.routes';
import { CoreState } from './state';
import { AuthModule } from '../auth/auth.module';
import { AuthState } from '../auth/state/auth.state';
import { NgxsApiPluginModule } from '../shared/api-plugin/api.module';

export const ENTRY_COMPONENTS = [
];

export const COMPONENTS = [
  ...ENTRY_COMPONENTS,
  CoreContainerComponent,
  CoreComponent
];

@NgModule({
  imports: [
    SharedModule.forRoot(),
    AuthModule.forRoot(),

    RouterModule.forRoot(routes, { useHash: true }),

    NgxsApiPluginModule.forRoot(),
    NgxsModule.forRoot([
      CoreState,
      AuthState
    ]),
    NgxsReduxDevtoolsPluginModule.forRoot({}),
    NgxsStoragePluginModule.forRoot({
      key: 'auth.token'
    })
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
        CoreStateService,
        HttpService
      ]
    };
  }
}
