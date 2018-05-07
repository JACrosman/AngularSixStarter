import { Routes } from '@angular/router';
import { AuthGuard } from '../auth/services/auth-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/projects',
    pathMatch: 'full'
  },
  {
    path: 'projects',
    loadChildren: '../project/project.module#ProjectModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'auth',
    loadChildren: '../auth/auth.module#AuthModule'
  }
];
