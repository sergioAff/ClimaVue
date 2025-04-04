import { inject, Injectable } from '@angular/core';
import { WeatherState } from './weather.state';

@Injectable({
  providedIn: 'root',
})
export class State {
  private readonly _weather = inject(WeatherState);

  get wheather() {
    return this._weather.store();
  }
}
