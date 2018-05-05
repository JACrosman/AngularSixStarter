import { Routes } from '@angular/router';

import { ProjectListContainerComponent } from './containers/project-list.container';
import { ProjectContainerComponent } from './containers/project.container';

export const routes: Routes = [
  {
    path: '', component: ProjectListContainerComponent
  },
  {
    path: ':id', component: ProjectContainerComponent,
    data: { animation: 'project' },
    children: [

    ]
  }
];
