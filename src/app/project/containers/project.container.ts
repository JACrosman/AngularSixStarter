import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../shared';
import { Observable } from 'rxjs';

import { Project } from '../models';
import { ProjectState } from '../state/project.state';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-container',
  animations: [ routerTransition ],
  template: `
    <div *ngIf="project$ | async as project" [@routerTransition]="getState(o)">
      <router-outlet #o="outlet"></router-outlet>
    </div>
  `
})
export class ProjectContainerComponent {
  project$: Observable<Project>;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectState
  ) {
    this.project$ = this.projectService.entity$;

    this.projectService.get(route.snapshot.params.id);
  }

  /**
   * Used for animation to get current route state
   * @param outlet
   */
  getState(outlet) {
    return outlet.activatedRouteData.animation;
  }
}
