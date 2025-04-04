import { Component } from '@angular/core';

@Component({
  selector: 'lib-loading-spinner',
  standalone: true,
  template: `
    <div class="flex justify-center items-center">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class LoadingSpinnerComponent {} 