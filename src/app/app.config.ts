import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http'; // Importa tanto withFetch como withInterceptors
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { interceptor } from './core/service/interceptor/interceptor.service'; // Importa tu interceptor

export const appConfig: ApplicationConfig = {
  
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),
    
    // Mantener todas las configuraciones previas de HttpClient y añadir el interceptor
    provideHttpClient(
      withFetch(),                // Mantiene la opción de Fetch
      withInterceptors([interceptor])  // Añadir el interceptor
    ),
  ],

};
