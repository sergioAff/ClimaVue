import { Component } from '@angular/core';
import { INavRouter } from 'shared';
import { AppHeaderComponent } from '../../components/app-header/app-header.component';

@Component({
  selector: 'lib-header',
  imports: [AppHeaderComponent],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  links: INavRouter[] = [
    {
      name: 'Today',
      path: '/',
    },
    {
      name: 'Tomorrow',
      path: '/tomorrow',
    },
    {
      name: 'Monthly Forecast',
      path: '/monthly-forecast',
    },
  ];
}
