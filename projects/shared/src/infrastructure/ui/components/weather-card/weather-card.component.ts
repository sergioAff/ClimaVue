import { Component, Input } from '@angular/core';
import { WeatherCard } from '../../../../domain/model/weatherCard.model';
import { DatePipe, NgIf } from '@angular/common';

@Component({
  selector: 'lib-weather-card',
  imports: [DatePipe, NgIf],
  templateUrl: './weather-card.component.html',
})
export class WeatherCardComponent {
  @Input() weatherCard!: WeatherCard;
  date: Date = new Date();
}
