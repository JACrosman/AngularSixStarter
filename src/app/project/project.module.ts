import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxsModule } from '@ngxs/store';

import { SharedModule } from '../shared';
import { ProjectState } from './state/project.state';
import { routes } from './project.routes';

// Containers
import { ProjectListContainerComponent } from './containers/project-list.container';
import { ProjectContainerComponent } from './containers/project.container';

// Components
import { ProjectNewComponent } from './components/new/project-new.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { ReactiveFormsModule } from '@angular/forms';

export const ENTRY_COMPONENTS = [
  ProjectNewComponent
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
    ReactiveFormsModule,

    SharedModule,

    NgxsModule.forFeature([
      ProjectState
    ])
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
  entryComponents: ENTRY_COMPONENTS,
  providers: [
    ProjectState
  ]
})
export class ProjectModule {
}
