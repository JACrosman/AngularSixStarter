import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable, of, combineLatest, Subscription } from 'rxjs';

import { Course, Project } from '../../shared/models';
import { ProjectState } from '../../project/state/project.state';
import { CoreStateService } from '../../core/services/core.state.service';
import { CourseState } from '../state/course.state';
import { mergeMap } from 'rxjs/operators';

/**
 * Component - CoursesContainerComponent
 *
 * Root component for displaying a list of courses
 */
@Component({
  selector: 'app-course-list-container',
  template: `
    <app-course-list
      [project]="data.project"
      [courses]="data.courses"
      (addCourse)="onAddCourse($event)"
      *ngIf="data$ | async; let data"
    >
    </app-course-list>`
})
export class CourseListContainerComponent {
  /** Observables */
  data$: Observable<{ project: Project, courses: Course[] }>;

  constructor(
    private courseService: CourseState,
    private projectService: ProjectState
  ) {
    this.data$ = combineLatest(
      this.projectService.entity$,
      this.courseService.entities$,
      (project, courses) => ({ project, courses })
    );

    this.courseService.query();
  }

  /** Add a new course */
  onAddCourse(course: Course) {
    this.courseService.create(course);
  }
}
