import { Component, Input, OnInit } from '@angular/core';
import { INavRouter, LogoComponent } from 'shared';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LogoComponent, RouterLink],
  template: `
    <header class="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center p-4 z-10">
      <div class="flex items-center gap-2 mb-4 sm:mb-0">
        <lib-logo></lib-logo>
        <div>
          <h1 class="text-3xl md:text-4xl font-semibold tracking-wide text-white">
            <a [routerLink]="['/']" class="hover:text-blue-300 transition-colors">ClimaVue</a>
          </h1>
          <span class="text-sm md:text-lg text-white/80 font-medium tracking-wide block sm:inline-block sm:ml-2">{{ getCurrentTime() }}</span>
        </div>
      </div>

    </header>
  `
})
export class AppHeaderComponent implements OnInit {
  @Input() links: INavRouter[] = [];
  
  ngOnInit(): void {
    this.updateSEO();
  }
  
  getCurrentTime(): string {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    return `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${hours >= 12 ? 'pm' : 'am'}`;
  }
  
  private updateSEO(): void {
    const head = document.getElementsByTagName('head')[0];
    
    // Agregar OG tags para compartir en redes sociales
    const ogTags = [
      { property: 'og:title', content: 'ClimaVue - Pronóstico del Tiempo en Tiempo Real' },
      { property: 'og:description', content: 'Consulta el pronóstico meteorológico para cualquier ciudad del mundo con datos precisos y actualizados.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: window.location.href },
      { property: 'og:locale', content: 'es_ES' }
    ];
    
    ogTags.forEach(tag => {
      let metaTag = document.querySelector(`meta[property="${tag.property}"]`);
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.setAttribute('property', tag.property);
        head.appendChild(metaTag);
      }
      metaTag.setAttribute('content', tag.content);
    });
    
    // Agregar canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', window.location.href.split('?')[0]);
  }
} 