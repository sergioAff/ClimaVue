import { Component } from '@angular/core';
import { HeaderHomeComponent } from '../../components/header-home/header-home.component';
import { INavRouter } from 'shared';

@Component({
  selector: 'lib-header',
  imports: [HeaderHomeComponent],
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
