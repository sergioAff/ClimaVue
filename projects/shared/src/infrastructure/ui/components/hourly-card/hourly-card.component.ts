import { Component, Input } from '@angular/core';
import { WeatherCard } from '../../../../domain/model/weatherCard.model';

@Component({
  selector: 'app-hourly-card',
  standalone: true,
  template: `
    <div class="flex-none w-48 p-4 rounded-2xl bg-gray-800/50 backdrop-blur-sm text-center">
      <p class="text-lg font-medium">{{ card.city }}</p>
      <div class="my-2">
        <img [src]="card.icon" [alt]="card.weather" class="w-12 h-12 mx-auto">
      </div>
      <p class="text-2xl font-bold">{{ card.temperature }}°</p>
    </div>
  `
})
export class HourlyCardComponent {
  @Input() card!: WeatherCard;
} 