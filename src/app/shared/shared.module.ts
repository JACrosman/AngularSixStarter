
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from './vendor';

const MODULES = [
  CommonModule,
  MaterialModule
];

@NgModule({
  imports: MODULES,
  exports: MODULES
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
      ]
    };
  }
}
