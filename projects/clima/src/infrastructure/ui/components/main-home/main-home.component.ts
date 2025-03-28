import { Component } from '@angular/core';
import { SearchInputComponent } from 'shared';

@Component({
  selector: 'lib-main-home',
  imports: [SearchInputComponent, SearchInputComponent],
  templateUrl: './main-home.component.html',
})
export class MainHomeComponent {}
