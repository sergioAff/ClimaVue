import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'shared';
import { Observable, map } from 'rxjs';
import { IWeather } from '../../domain/model/IWeather';
import { IRequiredQueryCity } from '../../domain/model/ICity';

@Injectable({
  providedIn: 'root',
})
export class GetWeatherService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiWeather;
  private apiKey = environment.apiKeyWeather;

  execute(placeId: string): Observable<IWeather[]> {
    // Construir URL con todos los parámetros necesarios
    const url = `${this.apiUrl}${placeId}&sections=current%2Chourly%2Cdaily&language=en&units=metric&key=${this.apiKey}`;
    
    console.log('API request URL:', url);
    
    return this.http.get<IWeather>(
      url,
      { headers: this.getHeaders() }
    ).pipe(
      map(response => {
        console.log('API Response:', JSON.stringify(response, null, 2));
        return [response as IWeather];
      }) 
    );
  }

  private getHeaders() {
    return new HttpHeaders().append('Content-Type', 'application/json');
  }
}
