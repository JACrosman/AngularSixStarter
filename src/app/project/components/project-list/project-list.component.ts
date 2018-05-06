import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material';

import { Project } from '../../models';
import { CoreStateService } from '../../../core';

/**
 * Component - ProjectListComponent
 *
 * Displays a list of projects
 */
@Component({
  selector: 'app-project-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent {
  /**
   * List of all projects the user has access to
   */
  @Input()
  projects: Project[];

  /**
   * New project click event
   */
  @Output()
  addProject: EventEmitter<Project> = new EventEmitter();

  constructor(
    public dialog: MatDialog
  ) {
  }

  /**
   * Show the create project dialog
   */
  add() {
  }
}
