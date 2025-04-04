import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WeatherCard, LoadingSpinnerComponent } from 'shared';
import { IRequiredQueryCity } from '../../../../domain/model/ICity';
import { NgIf } from '@angular/common';
import { SearchFormComponent } from '../../forms/search-form/search-form.component';
import { CurrentWeatherComponent } from '../current-weather/current-weather.component';
import { HourlyForecastComponent } from '../hourly-forecast/hourly-forecast.component';
import { NoDataMessageComponent } from '../no-data-message/no-data-message.component';

@Component({
  selector: 'lib-main-home',
  standalone: true,
  imports: [NgIf, LoadingSpinnerComponent, SearchFormComponent, CurrentWeatherComponent, HourlyForecastComponent, NoDataMessageComponent],
  templateUrl: './main-home.component.html',
})
export class MainHomeComponent implements OnInit {
  @Input() weatherData: WeatherCard[] = [];
  @Input() isLoading: boolean = false;
  @Input() backgroundImage: string | null = null;
  @Output() inputSubmit = new EventEmitter<IRequiredQueryCity>();
  
  currentYear: number = new Date().getFullYear();

  ngOnInit(): void {
    // Inicialización del componente
    this.updateMetaTags();
  }

  handleFormSubmit(query: IRequiredQueryCity) {
    this.inputSubmit.emit(query);
  }

  getFormattedDate(): string {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = { 
      month: 'long', 
      day: 'numeric', 
      weekday: 'short' 
    };
    return date.toLocaleDateString('en-US', options);
  }
  
  getCurrentTime(): string {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    return `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${hours >= 12 ? 'pm' : 'am'}`;
  }

  // Método para actualizar meta tags dinámicamente (para SEO)
  private updateMetaTags(): void {
    // Esta es una implementación simple. Para una implementación completa,
    // se puede usar el servicio Meta de Angular en un componente con acceso al head
    const head = document.getElementsByTagName('head')[0];
    
    // Actualiza la descripción
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 
      'ClimaVue - Consulta el pronóstico del tiempo en tiempo real para cualquier ciudad del mundo. Información precisa sobre temperaturas, velocidad del viento y condiciones meteorológicas.');
    
    // Agrega keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', 
      'clima, tiempo, pronóstico, meteorología, temperatura, viento, lluvia, sol, nube, ciudad');
  }
}
