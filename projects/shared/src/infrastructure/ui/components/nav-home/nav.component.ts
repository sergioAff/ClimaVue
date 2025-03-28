import { Component, Input } from '@angular/core';
import { INavRouter } from '../../../../domain/model/navRouter.model';
import { LinkNavComponent } from '../link-nav/link-nav.component';

@Component({
  selector: 'lib-nav',
  imports: [LinkNavComponent],
  templateUrl: './nav.component.html',
})
export class NavComponent {
  @Input() links: INavRouter[] = [];
}
