import { Component, Input } from '@angular/core';
import { INavRouter, NavComponent } from 'shared';
import { LogoComponent } from 'shared';

@Component({
  selector: 'lib-header-home',
  imports: [NavComponent, LogoComponent],
  templateUrl: './header-home.component.html',
})
export class HeaderHomeComponent {
  @Input() links: INavRouter[] = [];
}
