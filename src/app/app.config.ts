import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom, APP_INITIALIZER } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { OAuthModule, provideOAuthClient } from 'angular-oauth2-oidc';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { AuthService } from './services/auth/auth.service';

function initializeAuth(authService: AuthService): () => Promise<any> {
  return () => authService.initAuth();
}



export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(OAuthModule.forRoot()), // <-- ¡Esto es lo que faltaba!
    provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    provideOAuthClient(),
    AuthService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeAuth,
      deps: [AuthService], // Inyecta AuthService en la factory function
      multi: true
    }
  ]
  
};
