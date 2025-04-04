module.exports = {
  onPreBuild: async ({ utils }) => {
    // Localizar el archivo environment.prod.ts después de la compilación
    const environmentFiles = await utils.glob('dist/shared/**/*.js');
    
    // Obtener las variables de entorno
    const apiKeyWeather = process.env.apiKeyWeather || '';
    const apiKeyWallpaper = process.env.apiKeyWallpaper || '';
    const apiWeatherGetPlacesPrefix = process.env.apiWeatherGetPlacesPrefix || 'https://www.meteosource.com/api/v1/free/find_places_prefix?text=';
    const apiWeather = process.env.apiWeather || 'https://www.meteosource.com/api/v1/free/point?place_id=';
    
    // Sustituir las variables en los archivos
    for (const file of environmentFiles) {
      await utils.modifyFile(file, (content) => {
        return content
          .replace(/'\${apiKeyWeather}'/g, `'${apiKeyWeather}'`)
          .replace(/'\${apiKeyWallpaper}'/g, `'${apiKeyWallpaper}'`)
          .replace(/'\${apiWeatherGetPlacesPrefix}'/g, `'${apiWeatherGetPlacesPrefix}'`)
          .replace(/'\${apiWeather}'/g, `'${apiWeather}'`);
      });
    }
    
    console.log('Variables de entorno inyectadas correctamente');
  }
}; 