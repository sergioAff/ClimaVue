import { Routes } from '@angular/router';
import { BodyComponent } from 'shared';

export const routes: Routes = [
  {
    path: '',
    component: BodyComponent,
    loadChildren: () => import('clima').then((m) => m.routes),
  },
];
