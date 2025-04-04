const webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        apiKeyWeather: JSON.stringify(process.env.apiKeyWeather),
        apiKeyWallpaper: JSON.stringify(process.env.apiKeyWallpaper),
        apiWeatherGetPlacesPrefix: JSON.stringify(process.env.apiWeatherGetPlacesPrefix),
        apiWeather: JSON.stringify(process.env.apiWeather)
      }
    })
  ]
}; 