import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable, of } from 'rxjs';

import { Course } from '../models';
import { CoreStateService } from '../../core/services/core.state.service';
import { CourseState } from '../state/course.state';

/**
 * Component - CoursesContainerComponent
 *
 * Root component for displaying a list of courses
 */
@Component({
  selector: 'app-course-list-container',
  template: `
    <app-course-list
      [courses]="courses"
      (addCourse)="onAddCourse($event)"
      *ngIf="courses$ | async; let courses"
    >
    </app-course-list>`
})
export class CourseListContainerComponent {
  /** Observable list of courses */
  courses$: Observable<Course[]>;

  constructor(
    private courseService: CourseState
  ) {
    this.courses$ = this.courseService.entities$;

    this.courseService.query();
  }

  /** Add a new course */
  onAddCourse(course: Course) {
    this.courseService.create(course);
  }
}
