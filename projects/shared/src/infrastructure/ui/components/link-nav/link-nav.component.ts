import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { INavRouter } from '../../../../domain/model/navRouter.model';
import { Router } from '@angular/router';
@Component({
  selector: 'lib-link-nav',
  imports: [RouterLink],
  templateUrl: './link-nav.component.html',
})
export class LinkNavComponent {
  @Input() link: INavRouter = {
    name: '',
    path: '',
  };
  constructor(private router: Router) {}

  isRouterActive(link: INavRouter): boolean {
    return this.router.url === link.path;
  }
}
