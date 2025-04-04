import { Component, Input } from '@angular/core';
import { WeatherCard } from '../../../../domain/model/weatherCard.model';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-hourly-card',
  standalone: true,
  imports: [NgIf],
  template: `
    <div class="flex-none p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gray-800/50 backdrop-blur-sm text-center w-36 sm:w-40 md:w-48 hover:bg-gray-700/60 hover:scale-[1.02] transition-all duration-300 border border-white/5 hover:border-white/20">
      <p class="text-base sm:text-lg font-medium truncate text-white/90">{{ card.city }}</p>
      <div class="my-1 sm:my-2">
        <img *ngIf="card.icon" [src]="card.icon" [alt]="card.weather" class="h-10 w-10 sm:h-12 sm:w-12 mx-auto transform hover:scale-110 transition-transform duration-300">
      </div>
      <p class="text-xl sm:text-2xl font-bold text-white">{{ card.temperature }}°</p>
      <div class="mt-1 sm:mt-2 text-xs sm:text-sm flex items-center justify-center bg-white/10 rounded-full py-1 px-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 sm:h-4 sm:w-4 mr-1 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
        <span class="text-blue-100">{{ card.windSpeed }} km/h</span>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class HourlyCardComponent {
  @Input() card!: WeatherCard;
} 