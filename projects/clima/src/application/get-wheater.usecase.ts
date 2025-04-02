import { inject, Injectable } from '@angular/core';
import { State } from '../domain/state';
import { Observable, Subscription, tap, catchError, of } from 'rxjs';
import { IWeather } from '../domain/model/IWeather';
import { GetWeatherService } from '../infrastructure/services/get-weather.service';

@Injectable({
  providedIn: 'root',
})
export class GetWeatherUseCase {
  private readonly _service = inject(GetWeatherService);
  private readonly _state = inject(State);
  private subscriptions!: Subscription;

  weather$() {
    return this._state.wheather.weather.$() as Observable<IWeather[]>;
  }

  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }

  execute(query: string) {
    if (!query || query.trim() === '') {
      console.error('Empty query provided to GetWeatherUseCase.execute()');
      return;
    }
    
    this.subscriptions.add(
      this._service
        .execute(query)
        .pipe(
          tap((result: IWeather[]) => {
            if (result && result.length > 0) {
              this._state.wheather.weather.set(result);
              console.log('Weather data received:', result);
            } else {
              console.warn('No weather data received for query:', query);
            }
          }),
          catchError(error => {
            console.error('Error fetching weather data:', error);
            return of([]);
          })
        )
        .subscribe()
    );
  }
}
