import { Component, OnInit, Input } from '@angular/core';
import { routerTransition } from '../../../shared/';

@Component({
  selector: 'app-core',
  animations: [ routerTransition ],
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss']
})
export class CoreComponent implements OnInit {
  @Input()
  title: string;

  constructor() { }

  ngOnInit() {
  }

  /**
   * Used for animation to get current route state
   * @param outlet
   */
  getState(outlet) {
    return outlet.activatedRouteData.animation;
  }
}
