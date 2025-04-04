const fs = require('fs');
const path = require('path');

// Rutas a los archivos de entorno
const prodEnvFile = path.join(__dirname, 'projects/shared/src/environment/environment.prod.ts');
const devEnvFile = path.join(__dirname, 'projects/shared/src/environment/environment.ts');

// Verificar si existe el archivo de producción, si no, crear uno basado en el de desarrollo
if (!fs.existsSync(prodEnvFile) && fs.existsSync(devEnvFile)) {
  // Copiar el contenido del archivo de desarrollo
  const devEnvContent = fs.readFileSync(devEnvFile, 'utf8');
  
  // Crear el archivo de producción basado en el de desarrollo
  const prodEnvContent = devEnvContent
    .replace('production: false', 'production: true')
    // Reemplazar los valores con placeholders para su posterior reemplazo
    .replace(/apiKeyWeather:.*,/, "apiKeyWeather: '${apiKeyWeather}',")
    .replace(/apiKeyWallpaper:.*,/, "apiKeyWallpaper: '${apiKeyWallpaper}',")
    .replace(/apiWeatherGetPlacesPrefix:.*,/, "apiWeatherGetPlacesPrefix: '${apiWeatherGetPlacesPrefix}',")
    .replace(/apiWeather:.*,/, "apiWeather: '${apiWeather}',");
  
  fs.writeFileSync(prodEnvFile, prodEnvContent);
  console.log('Archivo environment.prod.ts creado correctamente');
}

// Leer el contenido actual (ya sea el archivo existente o el recién creado)
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