import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-weather-metric',
  template: `
    <div class="text-center">
      <p class="uppercase text-white/80 text-sm mb-1">{{ label }}</p>
      <p class="text-xl font-semibold">{{ value }}{{ unit }}</p>
    </div>
  `
})
export class WeatherMetricComponent {
  @Input() label: string = '';
  @Input() value: string | number = '';
  @Input() unit: string = '';
} 