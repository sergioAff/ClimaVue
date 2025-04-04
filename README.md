# ClimaVue

ClimaVue es una aplicación web moderna para consultar el clima, desarrollada con Angular 19. Ofrece una interfaz elegante y responsiva para visualizar información meteorológica actualizada.

![ClimaVue Screenshot](projects/app/public/partly-cloudy.svg)

## ✨ Características

- **Previsión meteorológica actualizada** - Consulta la información del clima en tiempo real
- **Búsqueda de ubicaciones** - Encuentra fácilmente la previsión meteorológica para cualquier ciudad
- **Pronóstico por horas** - Visualiza las previsiones del tiempo para las próximas horas
- **Interfaz moderna y adaptable** - Diseño responsivo que se adapta a cualquier dispositivo
- **Fondos dinámicos** - Imágenes de fondo que cambian según la condición meteorológica

## 🛠️ Tecnologías

- Angular 19
- TypeScript
- Material Design
- TailwindCSS
- APIs de pronóstico del tiempo y fondos dinámicos

## 🚀 Instalación

### Prerrequisitos

- Node.js ≥ 18.19
- NPM o Bun

### Configuración del proyecto

1. Clona este repositorio:
   ```bash
   git clone https://github.com/tu-usuario/ClimaVue.git
   cd ClimaVue
   ```

2. Instala las dependencias:
   ```bash
   npm install
   # o
   bun install
   ```

3. Crea un archivo `projects/shared/src/environment/environment.ts` con tus claves API:
   ```typescript
   export const environment = {
     production: false,
     apiKeyWeather: 'TU_CLAVE_API_WEATHER',
     apiKeyWallpaper: 'TU_CLAVE_API_WALLPAPER',
     apiWeatherGetPlacesPrefix: 'https://www.meteosource.com/api/v1/free/find_places_prefix?text=',
     apiWeather: 'https://www.meteosource.com/api/v1/free/point?place_id=',
   };
   ```

4. Inicia el servidor de desarrollo:
   ```bash
   npm start
   # o
   bun start
   ```

5. Abre tu navegador en `http://localhost:4200`

## 📝 Variables de entorno requeridas

Para un funcionamiento completo, necesitarás las siguientes claves API:

- `apiKeyWeather`: Clave para la API de pronóstico del tiempo (MeteSource)
- `apiKeyWallpaper`: Clave para la API de imágenes de fondo (Pexels)
- `apiWeatherGetPlacesPrefix`: Prefijo URL para búsqueda de lugares
- `apiWeather`: URL base para consulta de clima por ID de lugar

## 🏗️ Estructura del proyecto

El proyecto sigue una arquitectura modular con tres proyectos principales:

- **app**: Aplicación principal y punto de entrada
- **shared**: Componentes y servicios compartidos
- **clima**: Módulo principal de funcionalidad meteorológica

## 📦 Despliegue

### Despliegue en Netlify

1. Conecta tu repositorio a Netlify
2. Configura las siguientes variables de entorno en Netlify:
   - `apiKeyWeather`
   - `apiKeyWallpaper`
   - `apiWeatherGetPlacesPrefix`
   - `apiWeather`
3. Usa la siguiente configuración de despliegue:
   - Comando de construcción: `npm run build:netlify`
   - Directorio de publicación: `dist/app/browser`

## 📄 Licencia

[MIT](LICENSE)

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor, crea un issue antes de enviar un pull request.
