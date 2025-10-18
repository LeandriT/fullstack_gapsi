import { Routes } from '@angular/router';
import { Layout } from './layout/layout';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./features/welcome/welcome-routing.module').then(m => m.WelcomeRoutingModule),
      },
      {
        path: 'suppliers',
        loadChildren: () =>
          import('./features/suppliers/suppliers-routing.module').then(m => m.SuppliersRoutingModule),
      },
      {
        path: '**',
        redirectTo: ''
      }
    ],
  },
];