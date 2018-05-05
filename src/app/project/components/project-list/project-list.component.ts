import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';

import { Project } from '../../models';

/**
 * Component - ProjectListComponent
 *
 * Displays a list of projects
 */
@Component({
  selector: 'app-project-list',
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
  ) {}

  /**
   * Show the create project dialog
   */
  add() {
  }
}
