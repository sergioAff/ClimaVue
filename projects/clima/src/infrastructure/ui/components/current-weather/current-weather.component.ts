import { Component, Input } from '@angular/core';
import { WeatherCard, WeatherMetricComponent } from 'shared';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-current-weather',
  standalone: true,
  imports: [WeatherMetricComponent, NgFor],
  templateUrl: './current-weather.component.html'
})
export class CurrentWeatherComponent {
  @Input() weather!: WeatherCard;
  @Input() formattedDate: string = '';

  // Array de métricas para mostrar
  weatherMetrics = [
    { label: 'WIND', value: () => this.weather?.windSpeed, unit: 'km/h' }
  ];
} 