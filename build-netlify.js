const fs = require('fs');
const path = require('path');

// Rutas a los archivos de entorno
const envDir = path.join(__dirname, 'projects/shared/src/environment');
const prodEnvFile = path.join(envDir, 'environment.prod.ts');
const devEnvFile = path.join(envDir, 'environment.ts');

// Asegurarse de que el directorio existe
if (!fs.existsSync(envDir)) {
  fs.mkdirSync(envDir, { recursive: true });
  console.log('Directorio de entorno creado');
}

// Contenido para el archivo de desarrollo
const devEnvContent = `export const environment = {
  production: false,
  apiKeyWeather: '${process.env.apiKeyWeather || ""}',
  apiKeyWallpaper: '${process.env.apiKeyWallpaper || ""}',
  apiWeatherGetPlacesPrefix: '${process.env.apiWeatherGetPlacesPrefix || "https://www.meteosource.com/api/v1/free/find_places_prefix?text="}',
  apiWeather: '${process.env.apiWeather || "https://www.meteosource.com/api/v1/free/point?place_id="}',
};`;

// Contenido para el archivo de producción
const prodEnvContent = `export const environment = {
  production: true,
  apiKeyWeather: '${process.env.apiKeyWeather || ""}',
  apiKeyWallpaper: '${process.env.apiKeyWallpaper || ""}',
  apiWeatherGetPlacesPrefix: '${process.env.apiWeatherGetPlacesPrefix || "https://www.meteosource.com/api/v1/free/find_places_prefix?text="}',
  apiWeather: '${process.env.apiWeather || "https://www.meteosource.com/api/v1/free/point?place_id="}',
};`;

// Crear o actualizar ambos archivos
fs.writeFileSync(devEnvFile, devEnvContent);
fs.writeFileSync(prodEnvFile, prodEnvContent);

console.log('Archivos de entorno creados/actualizados correctamente'); 