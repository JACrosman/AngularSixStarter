import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material';

import { Course } from '../../models';
import { CoreStateService } from '../../../core';
import { CourseNewComponent } from '../new/course-new.component';

/**
 * Component - CourseListComponent
 *
 * Displays a list of courses
 */
@Component({
  selector: 'app-course-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent {
  /**
   * List of all courses the user has access to
   */
  @Input()
  courses: Course[];

  /**
   * New course click event
   */
  @Output()
  addCourse: EventEmitter<Course> = new EventEmitter();

  constructor(
    public dialog: MatDialog
  ) {
  }

  /**
   * Show the create course dialog
   */
  add() {
    const dialogRef = this.dialog.open(CourseNewComponent, {
    });

    dialogRef.afterClosed().subscribe((course) => {
      if (course) {
        this.addCourse.emit(course);
      }
    });
  }
}
