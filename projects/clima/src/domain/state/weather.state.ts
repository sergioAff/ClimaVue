import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StateFactory } from 'shared';
import { IExecuteResponse } from '../model/IBg';
import { ILocation, IRequiredQueryCity } from '../model/ICity';
import { IWeather } from '../model/IWeather';

@Injectable({
  providedIn: 'root',
})
export class WeatherState {
  private readonly _factory = inject(StateFactory);

  private readonly bg$ = new BehaviorSubject<IExecuteResponse[]>([]);
  private readonly cityPrefix$ = new BehaviorSubject<ILocation[]>([]);
  private readonly weather$ = new BehaviorSubject<IWeather[]>([]);
  private readonly cityInput$ = new BehaviorSubject<IRequiredQueryCity[]>([]);

  store() {
    return {
      bg: this._factory.state(this.bg$),
      cityPrefix: this._factory.state(this.cityPrefix$),
      weather: this._factory.state(this.weather$),
      cityInput: this._factory.state(this.cityInput$),
    };
  }
}
