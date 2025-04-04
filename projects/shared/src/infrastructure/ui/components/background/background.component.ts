import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-background',
  standalone: true,
  imports: [NgIf],
  template: `
    <div class="fixed inset-0 -z-10 transition-opacity duration-700">
      <img *ngIf="backgroundImage" 
           [src]="backgroundImage" 
           class="w-full h-full object-cover filter blur-sm brightness-75" 
           alt="Weather background image">
      <div *ngIf="!backgroundImage" 
           class="w-full h-full bg-gradient-to-b from-blue-400 via-blue-300 to-blue-200">
        <!-- Nubes minimalistas -->
        <div class="absolute top-[10%] left-[5%] w-40 h-16 rounded-full bg-white/60 animate-float-slow"></div>
        <div class="absolute top-[8%] left-[8%] w-32 h-14 rounded-full bg-white/60 animate-float"></div>
        <div class="absolute top-[12%] left-[15%] w-48 h-16 rounded-full bg-white/60 animate-float-delayed"></div>
        
        <div class="absolute top-[15%] right-[10%] w-32 h-14 rounded-full bg-white/60 animate-float-super-slow"></div>
        <div class="absolute top-[12%] right-[15%] w-48 h-16 rounded-full bg-white/60 animate-float-medium"></div>
        <div class="absolute top-[17%] right-[20%] w-36 h-14 rounded-full bg-white/60 animate-float-slow"></div>
        
        <!-- Sol minimalista -->
        <div class="absolute top-[30%] right-[10%] w-28 h-28 rounded-full bg-yellow-300/80 animate-pulse-sun">
          <!-- Rayos de sol -->
          <div class="absolute top-[-20px] left-1/2 transform -translate-x-1/2 w-2 h-10 bg-yellow-200/70"></div>
          <div class="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2 w-2 h-10 bg-yellow-200/70"></div>
          <div class="absolute left-[-20px] top-1/2 transform -translate-y-1/2 h-2 w-10 bg-yellow-200/70"></div>
          <div class="absolute right-[-20px] top-1/2 transform -translate-y-1/2 h-2 w-10 bg-yellow-200/70"></div>
        </div>
        
        <!-- Lluvia minimalista (lado izquierdo) -->
        <div class="absolute top-[50%] left-[15%]">
          <div class="absolute top-0 left-0 h-14 w-1.5 rounded-full bg-blue-200/70 animate-rain-drop1"></div>
          <div class="absolute top-0 left-10 h-12 w-1.5 rounded-full bg-blue-200/70 animate-rain-drop2"></div>
          <div class="absolute top-0 left-20 h-16 w-1.5 rounded-full bg-blue-200/70 animate-rain-drop3"></div>
          <div class="absolute top-0 left-30 h-10 w-1.5 rounded-full bg-blue-200/70 animate-rain-drop4"></div>
        </div>
        
        <!-- Viento minimalista (parte inferior) -->
        <div class="absolute bottom-[20%] left-[30%]">
          <div class="h-1.5 w-16 bg-white/50 rounded-full mb-3 animate-wind1"></div>
          <div class="h-1.5 w-24 bg-white/50 rounded-full mb-3 animate-wind2"></div>
          <div class="h-1.5 w-20 bg-white/50 rounded-full animate-wind3"></div>
        </div>
        
        <div class="absolute bottom-[15%] right-[20%]">
          <div class="h-1.5 w-20 bg-white/50 rounded-full mb-3 animate-wind3"></div>
          <div class="h-1.5 w-16 bg-white/50 rounded-full mb-3 animate-wind1"></div>
          <div class="h-1.5 w-24 bg-white/50 rounded-full animate-wind2"></div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    @keyframes float {
      0%, 100% { transform: translateY(0) translateX(0); }
      25% { transform: translateY(-10px) translateX(5px); }
      50% { transform: translateY(0) translateX(10px); }
      75% { transform: translateY(10px) translateX(5px); }
    }
    
    @keyframes pulse-sun {
      0%, 100% { opacity: 0.8; box-shadow: 0 0 15px rgba(250, 204, 21, 0.7); }
      50% { opacity: 1; box-shadow: 0 0 25px rgba(250, 204, 21, 0.9); }
    }
    
    @keyframes rain-drop {
      0% { transform: translateY(-20px); opacity: 0; }
      30% { opacity: 0.7; }
      80% { opacity: 0.7; }
      100% { transform: translateY(100px); opacity: 0; }
    }
    
    @keyframes wind {
      0% { transform: translateX(-10px); opacity: 0.4; }
      50% { opacity: 0.7; }
      100% { transform: translateX(10px); opacity: 0.4; }
    }
    
    .animate-float {
      animation: float 15s ease-in-out infinite;
    }
    
    .animate-float-delayed {
      animation: float 18s ease-in-out 2s infinite;
    }
    
    .animate-float-slow {
      animation: float 20s ease-in-out 1s infinite;
    }
    
    .animate-float-medium {
      animation: float 17s ease-in-out 0.5s infinite;
    }
    
    .animate-float-super-slow {
      animation: float 25s ease-in-out 3s infinite;
    }
    
    .animate-pulse-sun {
      animation: pulse-sun 5s ease-in-out infinite;
    }
    
    .animate-rain-drop1 {
      animation: rain-drop 2s ease-in-out infinite;
    }
    
    .animate-rain-drop2 {
      animation: rain-drop 2.3s ease-in-out 0.3s infinite;
    }
    
    .animate-rain-drop3 {
      animation: rain-drop 1.8s ease-in-out 0.5s infinite;
    }
    
    .animate-rain-drop4 {
      animation: rain-drop 2.5s ease-in-out 0.7s infinite;
    }
    
    .animate-wind1 {
      animation: wind 4s ease-in-out infinite;
    }
    
    .animate-wind2 {
      animation: wind 5s ease-in-out 1s infinite;
    }
    
    .animate-wind3 {
      animation: wind 4.5s ease-in-out 0.5s infinite;
    }
  `]
})
export class BackgroundComponent {
  @Input() backgroundImage: string | null = null;
} 