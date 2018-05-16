import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Course } from '../../models';

/**
 * Component - CourseNewComponent
 *
 * Modal dialog for course creation
 */
@Component({
  selector: 'app-course-new',
  templateUrl: './course-new.component.html'
})
export class CourseNewComponent {
  courseForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CourseNewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.courseForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['']
    });
  }

  /**
   * Create the course
   */
  submitForm() {
    this.close(this.courseForm.value);
  }

  /**
   * Close the modal dialog
   */
  close(course: Course): void {
    this.dialogRef.close(course);
  }
}
