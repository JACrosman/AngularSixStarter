import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

// Containers
import { CourseListContainerComponent } from './containers/course-list.container';

// Components
import { CourseListComponent } from './components/course-list/course-list.component';
import { CourseNewComponent } from './components/new/course-new.component';

import { CourseState } from './state/course.state';
import { SharedModule } from '../shared/shared.module';
import { routes } from './course.routes';
import { NgxsModule } from '@ngxs/store';

export const ENTRY_COMPONENTS = [
  CourseNewComponent
];

export const COMPONENTS = [
  ...ENTRY_COMPONENTS,
  CourseListContainerComponent,

  CourseListComponent
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,

    SharedModule,

    NgxsModule.forFeature([
      CourseState
    ])
  ],
  declarations: COMPONENTS,
  entryComponents: ENTRY_COMPONENTS,
  providers: [
    CourseState
  ]
})
export class CourseModule { }
