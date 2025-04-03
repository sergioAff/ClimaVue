import { Component } from '@angular/core';

@Component({
  selector: 'app-no-data-message',
  standalone: true,
  template: `
    <div class="text-center text-white rounded-lg p-8 max-w-2xl mx-auto select-none bg-black/30">
      <p class="text-xl">Ingresa el nombre de una ciudad para ver el clima</p>
    </div>
  `
})
export class NoDataMessageComponent {} 