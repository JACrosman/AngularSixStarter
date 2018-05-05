import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared';
import { ProjectListContainerComponent } from './containers/project-list.container';
import { ProjectContainerComponent } from './containers/project.container';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { routes } from './project.routes';

export const ENTRY_COMPONENTS = [
];

export const COMPONENTS = [
  ...ENTRY_COMPONENTS,
  ProjectListContainerComponent,
  ProjectContainerComponent,

  ProjectListComponent
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
export class ProjectModule {
  static forRoot() {
    return {
      ngModule: ProjectModule,
      providers: [
      ]
    };
  }
}
