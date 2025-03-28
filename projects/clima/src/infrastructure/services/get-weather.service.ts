import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../shared/src/environment/environment';
import { Observable } from 'rxjs';
import { IWeather } from '../../domain/model/IWeather';

@Injectable({
  providedIn: 'root',
})
export class GetWeatherService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiWeather;
  private apiKey = environment.apiKeyWeather;

  execute(query: string): Observable<IWeather[]> {
    return this.http.get<IWeather[]>(
      `${this.apiUrl}${query}&sections=current%2Chourly&language=en&units=metric&key=${this.apiKey}`,
      { headers: this.getHeaders() }
    );
  }

  private getHeaders() {
    return new HttpHeaders().append('Content-Type', 'application/json');
  }
}
