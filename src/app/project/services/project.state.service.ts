import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Store } from '@ngxs/store';

import { ProjectsState, LoadProjects } from '../state';
import { Project } from '../models';

@Injectable()
export class ProjectStateService {
    constructor(private store: Store) { }

    public loadProjects(): void {
      this.store.dispatch(new LoadProjects());
    }

    public getProjects(): Observable<Project[]> {
        return this.store.select(ProjectsState.projects);
    }
}
