import { Project } from '../models';

/**
 * Action - LoadProjects
 *
 * Request a list of projects from the server/cache
 */
export class LoadProjects {
    static readonly type = '[Project] GetAll';
}

/**
 * Action - LoadProject
 *
 * Request a single project from the server/cache
 */
export class LoadProject {
  static readonly type = '[Project] GetOne';

  public constructor(public payload: string) { }
}

/**
 * Action - CreateProject
 *
 * Create a new project on the server
 */
export class CreateProject {
  static readonly type = '[Project] Create';

  public constructor(public payload: Project) { }
}

/**
 * Action - SaveProject
 *
 * Update an existing project on the server
 */
export class SaveProject {
    static readonly type = '[Project] Update';

  public constructor(public payload: Project) { }
}

/**
 * Action - DeleteProject
 *
 * Delete an existing project on the server
 */
export class DeleteProject {
    static readonly type = '[Project] Dellete';

  public constructor(public payload: string) { }
}
