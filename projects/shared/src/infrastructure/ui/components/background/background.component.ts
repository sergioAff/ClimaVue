import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-background',
  standalone: true,
  imports: [NgIf],
  template: `
    <div class="absolute inset-0 -z-10">
      <img *ngIf="backgroundImage" 
           [src]="backgroundImage" 
           class="w-full h-full object-cover filter blur-md brightness-75" 
           alt="Background">
    </div>
  `
})
export class BackgroundComponent {
  @Input() backgroundImage: string | null = null;
} 