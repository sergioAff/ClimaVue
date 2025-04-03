import { Component, Input } from '@angular/core';
import { INavRouter, LogoComponent, NavComponent } from 'shared';

@Component({
  selector: 'app-header',
  imports: [LogoComponent],
  template: `
    <header class="max-w-7xl mx-auto flex justify-between items-center pt-4 z-10 ">
      <div class="flex items-center gap-2">
        <lib-logo></lib-logo>
        <h1 class="text-4xl font-semibold">Clima Vue</h1>
        <span class="text-lg pt-2 font-semibold tracking-wide">{{ getCurrentTime() }}</span>
      </div>

    </header>
  `
}
)
export class AppHeaderComponent {
  @Input() links: INavRouter[] = [];
  getCurrentTime(): string {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    return `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${hours >= 12 ? 'pm' : 'am'}`;
  }
} 