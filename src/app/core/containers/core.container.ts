import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';

import { CoreStateService } from '../services';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-core
      [title]="title$ | async"
    ></app-core>
  `
})
export class CoreContainerComponent {
  title$: Observable<string>;

  constructor(private coreService: CoreStateService) {
    this.title$ = this.coreService.getTitle();
  }
}
