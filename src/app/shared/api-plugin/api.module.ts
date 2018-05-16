import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NGXS_PLUGINS, NgxsModule, Store } from '@ngxs/store';
import { Injectors } from './injectors';

@NgModule({
  imports: [
    NgxsModule
  ],
  providers: [
    Injectors
  ]
})
export class NgxsApiPluginModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NgxsApiPluginModule
    };
  }

  constructor(
    private store: Store,
    private httpClient: HttpClient,
    injector: Injectors
  ) {
    injector.connect(store, httpClient);
  }
}
