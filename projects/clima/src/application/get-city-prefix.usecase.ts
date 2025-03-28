import { inject, Injectable } from '@angular/core';
import { GetCityPrefixService } from '../infrastructure/services/get-city-prefix.service';
import { State } from '../domain/state';
import { Observable, Subscription, tap, map } from 'rxjs';
import { ILocation, IRequiredQueryCity } from '../domain/model/ICity';

@Injectable({
  providedIn: 'root',
})
export class GetCityPrefixUseCase {
  private readonly _service = inject(GetCityPrefixService);
  private readonly _state = inject(State);
  private subscriptions!: Subscription;

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
    this.subscriptions.add(
      this._service
        .execute(query)
        .pipe(
          map((result: any) => {
            return result.map((item: any) => ({
              name: item.name,
              place_id: item.place_id,
              adm_area1: item.adm_area1,
              adm_area2: item.adm_area2,
              country: item.country,
              lat: item.lat,
              lon: item.lon,
              timezone: item.timezone,
              type: item.type,
            })) as ILocation[];
          }),
          tap((locations: ILocation[]) => {
            this._state.wheather.cityPrefix.set(locations);
          })
        )
        .subscribe()
    );
  }
}
