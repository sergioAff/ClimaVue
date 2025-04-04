import { Component } from '@angular/core';

@Component({
  selector: 'app-no-data-message',
  standalone: true,
  template: `
    <div class="text-center rounded-2xl p-8 max-w-2xl mx-auto backdrop-blur-md bg-white/20 border border-white/30 shadow-xl animate-fadeIn">
      <h2 class="text-3xl font-medium mb-4 text-gray-800 hover:text-gray-900 transition-colors">Welcome to ClimaVue</h2>
      <p class="text-xl mb-8 text-gray-700">Enter a city name to see the weather forecast</p>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
        <div class="bg-white/30 p-5 rounded-xl hover:bg-white/50 transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-1">
          <div class="flex items-center mb-3 text-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h3 class="font-medium text-lg text-gray-800">Search</h3>
          </div>
          <p class="text-gray-700">Type the name of any city in the world</p>
        </div>
        
        <div class="bg-white/30 p-5 rounded-xl hover:bg-white/50 transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-1">
          <div class="flex items-center mb-3 text-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
            </svg>
            <h3 class="font-medium text-lg text-gray-800">Weather</h3>
          </div>
          <p class="text-gray-700">Get current weather and hourly forecast</p>
        </div>
        
        <div class="bg-white/30 p-5 rounded-xl hover:bg-white/50 transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-1">
          <div class="flex items-center mb-3 text-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <h3 class="font-medium text-lg text-gray-800">Wind Speed</h3>
          </div>
          <p class="text-gray-700">Accurate data on wind speed</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(15px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fadeIn {
      animation: fadeIn 0.8s ease-out forwards;
    }
  `]
})
export class NoDataMessageComponent {} 