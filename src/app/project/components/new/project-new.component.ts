import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Project } from '../../models';

/**
 * Component - ProjectNewComponent
 *
 * Modal dialog for project creation
 */
@Component({
  selector: 'app-project-new',
  templateUrl: './project-new.component.html'
})
export class ProjectNewComponent {
  projectForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ProjectNewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.projectForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['']
    });
  }

  /**
   * Create the project
   */
  submitForm() {
    this.close(this.projectForm.value);
  }

  /**
   * Close the modal dialog
   */
  close(project: Project): void {
    this.dialogRef.close(project);
  }
}
