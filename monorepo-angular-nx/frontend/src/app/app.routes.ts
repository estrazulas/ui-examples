import { Route } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'event/new',
    loadComponent: () =>
      import('./events/event-form/event-form.component').then(
        (m) => m.EventFormComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'events',
    loadComponent: () =>
      import('./events/event-list/event-list.component').then(
        (m) => m.EventListComponent
      ),
  },
  {
    path: 'talks',
    loadComponent: () =>
      import('./talks/talk-list/talk-list.component').then(
        (m) => m.TalkListComponent
      ),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
  },
  {
    path: 'cfp',
    loadComponent: () =>
      import('./cfp/cfp-form.component').then((m) => m.CfpFormComponent),
  },
];
