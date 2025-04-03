import { Routes } from '@angular/router';
import { MainComponent } from '../containers/main/main.component';
import { HeaderComponent } from '../containers/header/header.component';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        outlet: 'main',
        component: MainComponent,
      },
      {
        path: '',
        outlet: 'header',
        component: HeaderComponent,
      },
    ],
  },
];
