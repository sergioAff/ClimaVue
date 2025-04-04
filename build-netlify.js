const fs = require('fs');
const path = require('path');

// Ruta al archivo environment.prod.ts
const prodEnvFile = path.join(__dirname, 'projects/shared/src/environment/environment.prod.ts');

// Leer el contenido actual
let envContent = fs.readFileSync(prodEnvFile, 'utf8');

// Reemplazar los placeholders con las variables de entorno
envContent = envContent
  .replace('${apiKeyWeather}', process.env.apiKeyWeather || '')
  .replace('${apiKeyWallpaper}', process.env.apiKeyWallpaper || '')
  .replace('${apiWeatherGetPlacesPrefix}', process.env.apiWeatherGetPlacesPrefix || 'https://www.meteosource.com/api/v1/free/find_places_prefix?text=')
  .replace('${apiWeather}', process.env.apiWeather || 'https://www.meteosource.com/api/v1/free/point?place_id=');

// Escribir el archivo actualizado
fs.writeFileSync(prodEnvFile, envContent);

console.log('Variables de entorno reemplazadas correctamente'); 