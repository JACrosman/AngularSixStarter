import { State, StateContext } from '@ngxs/store';
import {
  ApiEntityState,
  ApiBaseService,
  createRequest,
  createSuccess,
  createFailure
} from '../../shared/api-plugin';

import { environment } from '../../../environments/environment';
import { Project } from '../models';

export interface ProjectStateModel extends ApiEntityState<Project> {
  isPublishing?: boolean;
}

@State<ProjectStateModel>({
  name: 'projects',
  defaults: {
    ...ApiBaseService.defaults()
  }
})
export class ProjectState extends ApiBaseService<Project, ProjectStateModel> {
  constructor() {
    super(
      {
        route: `${environment.api_url}/project`,
        path: 'projects',
        idSelector: (project: Project) => project._id
      }
    );
  }
}
