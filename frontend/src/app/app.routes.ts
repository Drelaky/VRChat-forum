import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./core/core.component').then((m) => m.CoreComponent),
  },
  {
    path: 'forum',
    loadComponent: () => import('./pages/forum/forum').then((m) => m.Forum),
  },
  {
    path: '404',
    loadComponent: () =>
      import('./pages/not-found-component/not-found-component').then(
        (m) => m.NotFoundComponent
      ),
  },
  {
    path: '**',
    redirectTo: '404',
  },
];
