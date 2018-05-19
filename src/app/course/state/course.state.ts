import { State, StateContext } from '@ngxs/store';
import {
  ApiEntityState,
  ApiBaseService,
  createRequest,
  createSuccess,
  createFailure
} from '../../shared/api-plugin';

import { environment } from '../../../environments/environment';
import { Course } from '@authoring/shared';

export interface CourseStateModel extends ApiEntityState<Course> {
}

@State<CourseStateModel>({
  name: 'courses',
  defaults: {
    ...ApiBaseService.defaults()
  }
})
export class CourseState extends ApiBaseService<Course, CourseStateModel> {
  constructor() {
    super(
      {
        route: `${environment.api_url}/project/:projects/course`,
        path: 'courses',
        subRoutes: ['projects'],
        idSelector: (course: Course) => course._id
      }
    );
  }
}
