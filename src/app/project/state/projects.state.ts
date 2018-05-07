import { HttpClient } from '@angular/common/http';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { Project } from '../models';
​import {
  LoadProjects,
  LoadProject,
  CreateProject,
} from './project.actions';
import { CoreStateService } from '../../core';

export interface ProjectsStateModel {
  projects: Project[];
}

@State<ProjectsStateModel>({
  name: 'projects',
  defaults: {
    projects: []
  }
})
export class ProjectsState {
  constructor(
    private http: HttpClient,
    private coreService: CoreStateService
  ) { }

  @Selector()
  static projects(state: ProjectsStateModel) {
    return state.projects;
  }

  @Action(LoadProjects)
  getProjects(ctx: StateContext<ProjectsStateModel>, action: LoadProjects) {
    return this.http.get(environment.api_url + '/project').pipe(
      tap((projects: any) => {
        ctx.patchState({ projects });
      }),
      catchError(error => of(this.coreService.notificationError('Failed to load projects'))),
    );
  }
}
