import { Component, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { NgFor, NgClass } from '@angular/common';
import { WeatherCard, NavigationButtonComponent, HourlyCardComponent } from 'shared';

@Component({
  selector: 'app-hourly-forecast',
  standalone: true,
  imports: [NgFor, HourlyCardComponent],
  templateUrl: './hourly-forecast.component.html',
})
export class HourlyForecastComponent implements AfterViewInit {
  @Input() hourlyForecast: WeatherCard[] = [];
  @ViewChild('cardsContainer') cardsContainer!: ElementRef;
  
  private scrollAmount = 250; // Cantidad de píxeles a desplazar

  ngAfterViewInit(): void {
    // Aseguramos que el contenedor está disponible después de que la vista se inicializa
    console.log('Scroll container initialized');
    if (this.cardsContainer) {
      console.log('Container exists:', this.cardsContainer.nativeElement);
    } else {
      console.error('Container not found!');
    }
  }

  navigateHourly(direction: 'prev' | 'next'): void {
    console.log(`Attempting to navigate: ${direction}`);
    
    if (!this.cardsContainer) {
      console.error('Container ref not available');
      return;

    }
    
    const container = this.cardsContainer.nativeElement;
    console.log('Container before scroll:', container.scrollLeft);
    
    try {
      if (direction === 'next') {
        container.scrollLeft += this.scrollAmount;
        console.log(`Scrolled next by ${this.scrollAmount}px`);
      } else {
        container.scrollLeft -= this.scrollAmount;
        console.log(`Scrolled prev by ${this.scrollAmount}px`);
      }
      
      console.log('Container after manual scroll:', container.scrollLeft);
    } catch (error) {
      console.error('Error during scrolling:', error);
    }
  }
} 