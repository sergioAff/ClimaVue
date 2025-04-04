import { Component, EventEmitter, Output } from '@angular/core';
import { SearchInputComponent } from 'shared';
import { IRequiredQueryCity } from '../../../../domain/model/ICity';

@Component({
  selector: 'app-search-form',
  standalone: true,
  imports: [SearchInputComponent],
  template: `
    <div class="max-w-2xl w-full mx-auto rounded-lg p-4">
      <lib-search-input (formSubmit)="handleInputSubmit($event)"></lib-search-input>
    </div>
  `,
})
export class SearchFormComponent {
  @Output() formSubmit = new EventEmitter<IRequiredQueryCity>();

  handleInputSubmit(cityName: string) {
    if (!cityName || cityName.trim() === '') {
      return;
    }
    this.formSubmit.emit({ query: cityName });
  }
} 