import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MainHomeComponent } from '../../components/main-home/main-home.component';
import { GetWeatherUseCase } from '../../../../application/get-wheater.usecase';
import { IWeather } from '../../../../domain/model/IWeather';
import { IRequiredQueryCity } from '../../../../domain/model/ICity';
import { Observable, BehaviorSubject, Subscription, catchError, of, tap, switchMap, finalize } from 'rxjs';
import { GetBackgroundUseCase } from '../../../../application/get-bg.usecase';
import { GetCityPrefixUseCase } from '../../../../application/get-city-prefix.usecase';
import { BackgroundComponent, WeatherCard } from 'shared';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'lib-main',
  standalone: true,
  imports: [MainHomeComponent, AsyncPipe, BackgroundComponent],
  templateUrl: './main.component.html',
})
export class MainComponent implements OnInit, OnDestroy {
  private readonly _weatherUseCase = inject(GetWeatherUseCase);
  private readonly _cityPrefixUseCase = inject(GetCityPrefixUseCase);
  private readonly _bgUseCase = inject(GetBackgroundUseCase);
  
  private weatherCardsSubject = new BehaviorSubject<WeatherCard[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  
  public weatherData$ = this.weatherCardsSubject.asObservable();
  public backgroundImage$!: Observable<string | null>;
  public isLoading$ = this.loadingSubject.asObservable();
  
  private lastSearchedCity: string = '';
  private subscription = new Subscription();

  handleInputSubmit(value: IRequiredQueryCity) {
    if (!value || !value.query) {
      return;
    }
    
    this.lastSearchedCity = value.query;
    this.loadingSubject.next(true);
    console.log('Starting search for:', value.query);
    
    this.weatherCardsSubject.next([]);

    this._bgUseCase.execute(value.query);

    this._cityPrefixUseCase.execute(value);
    
    // Safety timeout to ensure spinner doesn't stay active forever
    const spinnerTimeout = setTimeout(() => {
      this.loadingSubject.next(false);
    }, 15000);

    const sub = this._cityPrefixUseCase.cityPrefix$().pipe(
      tap(locations => {
        console.log('Got locations:', locations);
        if (!locations || locations.length === 0) {
          this.loadingSubject.next(false);
          clearTimeout(spinnerTimeout);
          return;
        }
        
        const placeId = locations[0].place_id;
        console.log('Using place_id:', placeId);
        
        this._weatherUseCase.execute(placeId);
      }),
      finalize(() => {
        console.log('City prefix stream finalized');
      })
    ).subscribe();
    
    this.subscription.add(sub);

    const weatherSub = this._weatherUseCase.weather$().pipe(
      tap(weatherData => {
        console.log('Got weather data:', weatherData);
        if (weatherData && weatherData.length > 0) {
          const cards = this.mapToWeatherCards(weatherData, this.lastSearchedCity);
          this.weatherCardsSubject.next(cards);
        }

        this.loadingSubject.next(false);
        clearTimeout(spinnerTimeout);
      }),
      catchError(error => {
        console.error('Error in weather data stream:', error);
        this.loadingSubject.next(false);
        clearTimeout(spinnerTimeout);
        return of([]);
      }),
      finalize(() => {
        console.log('Weather data stream finalized');
        this.loadingSubject.next(false);
        clearTimeout(spinnerTimeout);
      })
    ).subscribe();

    this.subscription.add(weatherSub);
  }

  ngOnInit(): void {
    this._weatherUseCase.initSubscriptions();
    this._cityPrefixUseCase.initSubscriptions();
    this._bgUseCase.initSubscriptions();
    
    this.backgroundImage$ = this._bgUseCase.bg$().pipe(
      switchMap(bgData => {
        if (bgData && bgData.length > 0 && bgData[0].photos && bgData[0].photos.length > 0) {
          return of(bgData[0].photos[0].src.landscape);
        }
        return of(null);
      }),
      catchError(err => {
        console.error('Error getting background image:', err);
        return of(null);
      })
    );
  }

  ngOnDestroy(): void {
    this._weatherUseCase.destroySubscriptions();
    this._cityPrefixUseCase.destroySubscriptions();
    this._bgUseCase.destroySubscriptions();
    this.subscription.unsubscribe();
    this.weatherCardsSubject.complete();
    this.loadingSubject.complete();
  }

  private mapToWeatherCards(weatherData: IWeather[], cityName: string): WeatherCard[] {
    if (!weatherData || weatherData.length === 0) {
      return [];
    }

    try {
      const weather = weatherData[0];
      
      // Depuración detallada
      console.log('Current weather data structure:', JSON.stringify(weather.current, null, 2));
      if (weather.hourly && weather.hourly.data && weather.hourly.data.length > 0) {
        console.log('Hourly data example:', JSON.stringify(weather.hourly.data[0], null, 2));
      }
      
      // Función para extraer valores con seguridad
      const safeGet = (obj: any, path: string, defaultValue: any = 0) => {
        const keys = path.split('.');
        let result = obj;
        for (const key of keys) {
          if (result === undefined || result === null) return defaultValue;
          result = result[key];
        }
        return (result !== undefined && result !== null) ? result : defaultValue;
      };
      
      const currentWeatherCard: WeatherCard = {
        id: 1,
        city: cityName,
        temperature: safeGet(weather, 'current.temperature'),
        weather: safeGet(weather, 'current.summary', ''),
        humidity: safeGet(weather, 'current.humidity'),
        windSpeed: safeGet(weather, 'current.wind.speed'),
        visibility: safeGet(weather, 'current.visibility'),
        pressure: safeGet(weather, 'current.pressure'),
        icon: weather.current.icon ? `https://www.meteosource.com/static/img/ico/weather/${weather.current.icon}.svg` : ''
      };
      
      console.log('Mapped current weather card:', currentWeatherCard);
      
      const hourlyWeatherCards: WeatherCard[] = weather.hourly?.data
        .slice(0, 5)
        .map((hourlyData, index) => {
          const card = {
            id: index + 2,
            city: `${cityName} - ${new Date(hourlyData.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
            temperature: safeGet(hourlyData, 'temperature'),
            weather: safeGet(hourlyData, 'summary', ''),
            humidity: safeGet(hourlyData, 'humidity'),
            windSpeed: safeGet(hourlyData, 'wind.speed'),
            visibility: safeGet(hourlyData, 'visibility'),
            pressure: safeGet(hourlyData, 'pressure'),
            icon: hourlyData.icon ? `https://www.meteosource.com/static/img/ico/weather/${hourlyData.icon}.svg` : ''
          };
          console.log(`Hourly card ${index}:`, card);
          return card;
        }) || [];
      
      return [currentWeatherCard, ...hourlyWeatherCards];
    } catch (error) {
      console.error('Error mapping weather data to cards:', error);
      return [];
    }
  }
}
