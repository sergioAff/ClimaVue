import { inject, Injectable } from '@angular/core';
import { GetCityPrefixService } from '../infrastructure/services/get-city-prefix.service';
import { State } from '../domain/state';
import { Observable, Subscription, tap, map, catchError, of } from 'rxjs';
import { ILocation, IRequiredQueryCity } from '../domain/model/ICity';

@Injectable({
  providedIn: 'root',
})
export class GetCityPrefixUseCase {
  private readonly _service = inject(GetCityPrefixService);
  private readonly _state = inject(State);
  private subscriptions: Subscription = new Subscription();

  cityPrefix$() {
    return this._state.wheather.cityPrefix.$() as Observable<ILocation[]>;
  }

  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }

  execute(query: IRequiredQueryCity) {
    if (!query || !query.query || query.query.trim() === '') {
      console.error('Empty query provided to GetCityPrefixUseCase.execute()');
      return;
    }

    this.subscriptions.add(
      this._service
        .execute(query)
        .pipe(
          tap((locations: ILocation[]) => {
            if (locations && locations.length > 0) {
              this._state.wheather.cityPrefix.set(locations);
            } else {
              console.warn('No locations found for query:', query.query);
            }
          }),
          catchError(error => {
            console.error('Error fetching city prefix data:', error);
            return of([]);
          })
        )
        .subscribe()
    );
  }

  snapshot() {
    return this._state.wheather.cityPrefix.snapshot();
  }
}
