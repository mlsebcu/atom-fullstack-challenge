import { Routes } from '@angular/router';
import { AuthGuard, LoginGuard } from './core/guards/authorization.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    canActivate: [LoginGuard],
    loadComponent: () =>
      import('./features/auth/login-page.component').then(
        (m) => m.LoginPageComponent,
      ),
  },
  {
    path: 'tasks',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./features/tasks/tasks-page.component').then(
        (m) => m.TasksPageComponent,
      ),
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./modules/example-page/example-page.component').then(
        (m) => m.ExamplePageComponent,
      ),
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
