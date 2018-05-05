import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable, of } from 'rxjs';

import { Project } from '../models';

/**
 * Component - ProjectsContainerComponent
 *
 * Root component for displaying a list of projects
 */
@Component({
  selector: 'app-project-list-container',
  template: `
    <app-project-list
      [projects]="projects"
      (addProject)="onAddProject($event)"
      *ngIf="projects$ | async; let projects"
    >
    </app-project-list>`
})
export class ProjectListContainerComponent {
  /** Observable list of projects */
  projects$: Observable<Project[]>;

  constructor(
    public dialog: MatDialog
  ) {
    this.projects$ = of([]);
    // this.projects$ = this.projectService.loadProjects();
  }

  /** Add a new project */
  onAddProject(project: Project) {
    // this.projectService.createProject(project);
  }
}
