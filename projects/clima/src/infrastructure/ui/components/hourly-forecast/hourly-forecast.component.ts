import { Component, Input } from '@angular/core';
import { NgFor } from '@angular/common';
import { WeatherCard, NavigationButtonComponent, HourlyCardComponent } from 'shared';

@Component({
  selector: 'app-hourly-forecast',
  standalone: true,
  imports: [NgFor, NavigationButtonComponent, HourlyCardComponent],
  templateUrl: './hourly-forecast.component.html',
})
export class HourlyForecastComponent {
  @Input() hourlyForecast: WeatherCard[] = [];

  navigateHourly(direction: 'prev' | 'next'): void {
    console.log(`Navigate ${direction}`);
  }
} 