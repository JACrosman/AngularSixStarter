import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../shared';

@Component({
  selector: 'app-project-container',
  animations: [ routerTransition ],
  template: `
    <div *ngIf="project$ | async" [@routerTransition]="getState(o)">
      <router-outlet #o="outlet"></router-outlet>
    </div>
  `
})
export class ProjectContainerComponent {
  constructor() { }

  /**
   * Used for animation to get current route state
   * @param outlet
   */
  getState(outlet) {
    return outlet.activatedRouteData.animation;
  }

}
