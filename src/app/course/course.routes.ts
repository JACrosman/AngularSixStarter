import { Routes } from '@angular/router';

import { CourseListContainerComponent } from './containers/course-list.container';

export const routes: Routes = [
  {
    path: '', component: CourseListContainerComponent
  },
  // {
  //   path: ':id', component: ProjectContainerComponent,
  //   data: { animation: 'project' },
  //   children: [
  //     {
  //       path: '', component: ProjectModulesComponent
  //     }
  //   ]
  // }
];
