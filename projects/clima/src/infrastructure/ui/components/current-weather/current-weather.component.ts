import { Component, Input } from '@angular/core';
import { WeatherCard, WeatherMetricComponent } from 'shared';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-current-weather',
  standalone: true,
  imports: [WeatherMetricComponent, NgFor, NgIf],
  templateUrl: './current-weather.component.html'
})
export class CurrentWeatherComponent {
  @Input() weather!: WeatherCard;
  @Input() formattedDate: string = '';

  // Array de métricas para mostrar
  weatherMetrics = [
    { label: 'HUMIDITY', value: () => this.weather?.humidity, unit: '%' },
    { label: 'VISIBILITY', value: () => this.weather?.visibility, unit: 'km' },
    { label: 'AIR PRESSURE', value: () => this.weather?.pressure, unit: 'hPa' },
    { label: 'WIND', value: () => this.weather?.windSpeed, unit: 'mph' }
  ];
} 