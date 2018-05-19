
import { MatSnackBar } from '@angular/material';
import { State, Action, Selector, StateContext } from '@ngxs/store';

import { CoreConfig } from '../../shared/models/core.model';
​import { SetTitle, DisplayError } from './core.actions';

export type CoreStateModel = CoreConfig;

@State<CoreStateModel>({
  name: 'config',
  defaults: {
      title: 'Waypoints Authoring'
  }
})
export class CoreState {
    constructor(
      public snackBar: MatSnackBar
    ) {}

    @Selector()
    static title(state: CoreStateModel) {
      return state.title;
    }

    @Action(SetTitle)
    setTitle(ctx: StateContext<CoreStateModel>, action: SetTitle) {
      ctx.patchState({
        title: action.title
      });
    }


    @Action(DisplayError)
    displayError(ctx: StateContext<CoreStateModel>, action: DisplayError) {
      this.snackBar.open(action.message, 'ERROR', {
        duration: 5000,
        panelClass: ['mat-snackbar-error']
      });
    }
}
