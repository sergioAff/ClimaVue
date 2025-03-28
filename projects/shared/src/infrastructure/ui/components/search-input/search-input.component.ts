import { Component, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'lib-search-input',
  imports: [],
  templateUrl: './search-input.component.html',
})
export class SearchInputComponent {
  @Output() search: string = '';

  constructor() {}

  onChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.search = input.value;
  }
}
