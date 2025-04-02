import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MainHomeComponent } from '../../components/main-home/main-home.component';
import { GetWeatherUseCase } from '../../../../application/get-wheater.usecase';
import { IWeather } from '../../../../domain/model/IWeather';
import { IRequiredQueryCity } from '../../../../domain/model/ICity';
import { Observable, BehaviorSubject, Subscription, catchError, of, tap, filter, switchMap, finalize } from 'rxjs';
import { GetBackgroundUseCase } from '../../../../application/get-bg.usecase';
import { GetCityPrefixUseCase } from '../../../../application/get-city-prefix.usecase';
import { WeatherCard } from 'shared';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'lib-main',
  standalone: true,
  imports: [MainHomeComponent, AsyncPipe, NgIf],
  templateUrl: './main.component.html',
})
export class MainComponent implements OnInit, OnDestroy {
  private readonly _weatherUseCase = inject(GetWeatherUseCase);
  private readonly _cityPrefixUseCase = inject(GetCityPrefixUseCase);
  private readonly _bgUseCase = inject(GetBackgroundUseCase);
  
  private weatherCardsSubject = new BehaviorSubject<WeatherCard[]>([]);
  public weatherData$ = this.weatherCardsSubject.asObservable();
  public backgroundImage$!: Observable<string | null>;
  public isLoading: boolean = false;
  
  private lastSearchedCity: string = '';
  private subscription = new Subscription();

  handleInputSubmit(value: IRequiredQueryCity) {
    if (!value || !value.query) {
      return;
    }
    
    this.lastSearchedCity = value.query;
    this.isLoading = true;
    console.log('Starting search for:', value.query);
    
    this.weatherCardsSubject.next([]);

    this._bgUseCase.execute(value.query);

    this._cityPrefixUseCase.execute(value);
    
    const spinnerTimeout = setTimeout(() => {
      this.isLoading = false;
    }, 15000);

    const sub = this._cityPrefixUseCase.cityPrefix$().pipe(
      tap(locations => {
        console.log('Got locations:', locations);
        if (!locations || locations.length === 0) {
          this.isLoading = false;
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

        this.isLoading = false;
        clearTimeout(spinnerTimeout);
      }),
      catchError(error => {
        console.error('Error in weather data stream:', error);
        this.isLoading = false;
        clearTimeout(spinnerTimeout);
        return of([]);
      }),
      finalize(() => {
        console.log('Weather data stream finalized');
        this.isLoading = false;
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
  }

  private mapToWeatherCards(weatherData: IWeather[], cityName: string): WeatherCard[] {
    if (!weatherData || weatherData.length === 0) {
      return [];
    }

    try {
      const weather = weatherData[0];
      
      const currentWeatherCard: WeatherCard = {
        id: 1,
        city: cityName,
        temperature: weather.current.temperature,
        weather: weather.current.summary,
        humidity: 75,
        windSpeed: weather.current.wind.speed,
        visibility: 10,
        pressure: 1000,
        icon: `https://www.meteosource.com/static/img/ico/weather/${weather.current.icon}.svg`
      };
      
      const hourlyWeatherCards: WeatherCard[] = weather.hourly?.data
        .slice(0, 5)
        .map((hourlyData, index) => ({
          id: index + 2,
          city: `${cityName} - ${new Date(hourlyData.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
          temperature: hourlyData.temperature,
          weather: hourlyData.summary,
          humidity: 75,
          windSpeed: hourlyData.wind.speed,
          visibility: 10,
          pressure: 1000,
          icon: `https://www.meteosource.com/static/img/ico/weather/${hourlyData.icon}.svg`
        })) || [];
      
      return [currentWeatherCard, ...hourlyWeatherCards];
    } catch (error) {
      console.error('Error mapping weather data to cards:', error);
      return [];
    }
  }
}
