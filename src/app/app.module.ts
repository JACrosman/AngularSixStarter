import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { CoreContainerComponent } from './core/containers/core.container';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,

    // App Modules
    SharedModule.forRoot(),
    CoreModule.forRoot()
  ],
  providers: [],
  bootstrap: [CoreContainerComponent]
})
export class AppModule { }
