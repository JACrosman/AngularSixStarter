import { State, Action, Selector, StateContext } from '@ngxs/store';

import { CoreConfig } from '../models/core.model';
​import { SetTitle } from './core.actions';

export type CoreStateModel = CoreConfig;

@State<CoreStateModel>({
  name: 'config',
  defaults: {
      title: 'Waypoints Authoring'
  }
})
export class CoreState {
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
}
