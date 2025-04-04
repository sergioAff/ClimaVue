import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-navigation-button',
  standalone: true,
  template: `
    <button 
      class="text-white/60 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
      (click)="handleClick()">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        class="h-10 w-10" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor">
        <path 
          stroke-linecap="round" 
          stroke-linejoin="round" 
          stroke-width="2" 
          [attr.d]="direction === 'left' ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7'" />
      </svg>
    </button>
  `
})
export class NavigationButtonComponent {
  @Input() direction: 'left' | 'right' = 'left';
  @Output() onClick = new EventEmitter<void>();

  handleClick(): void {
    console.log(`Navigation button clicked: ${this.direction}`);
    this.onClick.emit();
  }
} 