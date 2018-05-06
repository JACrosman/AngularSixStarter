import { State, Action, Selector, StateContext } from '@ngxs/store';
import { of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { Project } from '../models';
​import {
  LoadProjects,
  LoadProject,
  CreateProject,
} from './project.actions';
import { HttpClient } from '@angular/common/http';

export interface ProjectsStateModel {
  projects: Project[];
}

@State<ProjectsStateModel>({
  name: 'config',
  defaults: {
    projects: []
  }
})
export class ProjectState {
  constructor(private http: HttpClient) { }

  @Selector()
  static projects(state: ProjectsStateModel) {
    return state.projects;
  }

  @Action(LoadProjects)
  getProjects(ctx: StateContext<ProjectsStateModel>, action: LoadProjects) {
    return this.http.get('/api/projects').pipe(
      tap((projects: any) => {
        ctx.patchState({ projects });
      }),
      catchError(error => of(window.alert('could not add todo'))),
    );
  }
}
