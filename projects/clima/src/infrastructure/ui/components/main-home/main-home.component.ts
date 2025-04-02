import { Component, EventEmitter, Input, Output } from '@angular/core';
import { WeatherCard, WeatherCardComponent, LoadingSpinnerComponent } from 'shared';
import { IRequiredQueryCity } from '../../../../domain/model/ICity';
import { NgFor, NgIf } from '@angular/common';
import { SearchFormComponent } from '../../forms/search-form/search-form.component';

@Component({
  selector: 'lib-main-home',
  standalone: true,
  imports: [NgFor, NgIf, LoadingSpinnerComponent, WeatherCardComponent, SearchFormComponent],
  templateUrl: './main-home.component.html',
})
export class MainHomeComponent {
  @Input() weatherData: WeatherCard[] = [];
  @Input() isLoading: boolean = false;
  @Input() backgroundImage: string | null = null;
  @Output() inputSubmit = new EventEmitter<IRequiredQueryCity>();

  handleFormSubmit(query: IRequiredQueryCity) {
    this.inputSubmit.emit(query);
  }

  getFormattedDate(): string {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = { 
      month: 'long', 
      day: 'numeric', 
      weekday: 'short' 
    };
    return date.toLocaleDateString('en-US', options);
  }
  
  getCurrentTime(): string {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    return `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${hours >= 12 ? 'pm' : 'am'}`;
  }
}
