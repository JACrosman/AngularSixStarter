import { Routes } from '@angular/router';

import { ProjectListContainerComponent } from './containers/project-list.container';
import { ProjectContainerComponent } from './containers/project.container';
import { ProjectModulesComponent } from './components/modules/modules.component';

export const routes: Routes = [
  {
    path: '', component: ProjectListContainerComponent
  },
  {
    path: ':id', component: ProjectContainerComponent,
    data: { animation: 'project' },
    children: [
      {
        path: '', component: ProjectModulesComponent
      },
      {
        path: 'courses',
        loadChildren: '../course/course.module#CourseModule'
      },
    ]
  }
];
