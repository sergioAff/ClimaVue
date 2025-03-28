import { inject, Injectable } from '@angular/core';
import { State } from '../domain/state';
import { Observable, Subscription, tap } from 'rxjs';
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
    this.subscriptions.add(
      this._service
        .execute(query)
        .pipe(
          tap((result: any) => {
            this._state.wheather.weather.set(result);
          })
        )
        .subscribe()
    );
  }
}
