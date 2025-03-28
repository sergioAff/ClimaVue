import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../shared/src/environment/environment';
import { ILocation, IRequiredQueryCity } from '../../domain/model/ICity';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetCityPrefixService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiWeatherGetPlacesPrefix;
  private apiKey = environment.apiKeyWeather;

  execute(query: IRequiredQueryCity): Observable<ILocation[]> {
    return this.http.get<ILocation[]>(
      `${this.apiUrl}${query}&language=en&key=${this.apiKey}`,
      {
        headers: this.getHeaders(),
      }
    );
  }

  private getHeaders() {
    return new HttpHeaders().append('Content-Type', 'application/json');
  }
}
