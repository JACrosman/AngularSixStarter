import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';

import { ProjectsState } from './projects.state';

@NgModule({
  declarations: [],
  imports: [
    NgxsModule.forFeature([
      ProjectsState
    ])
  ],
  exports: [],
  providers: [
    ProjectsState
  ],
})
export class ProjectStateModule {}
