import { Routes } from '@angular/router';
import { MainComponent } from '../containers/main/main.component';
import { HeaderComponent } from '../containers/header/header.component';
import { FooterComponent } from '../containers/footer/footer.component';

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
      {
        path: '',
        outlet: 'footer',
        component: FooterComponent,
      },
    ],
  },
];
