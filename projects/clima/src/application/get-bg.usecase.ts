import { inject, Injectable } from '@angular/core';
import { GetBgService } from '../infrastructure/services/get-bg.service';
import { State } from '../domain/state';
import { Observable, Subscription, tap } from 'rxjs';
import { IExecuteResponse } from '../domain/model/IBg';

@Injectable({
  providedIn: 'root',
})
export class GetBackgroundUseCase {
  private readonly _service = inject(GetBgService);
  private readonly _state = inject(State);
  private subscriptions: Subscription = new Subscription();

  bg$(): Observable<IExecuteResponse[]> {
    return this._state.wheather.bg.$() as Observable<IExecuteResponse[]>;
  }

  initSubscriptions(): void {
    this.subscriptions = new Subscription();
  }

  destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }

  execute(bg: string) {
    this.subscriptions.add(
      this._service
        .execute(bg)
        .pipe(
          tap((result) => {
            this._state.wheather.bg.set([result]);
          })
        )
        .subscribe()
    );
  }
}
