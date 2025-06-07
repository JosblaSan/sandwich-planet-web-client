import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { OAuthModule } from 'angular-oauth2-oidc';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { registerLocaleData } from '@angular/common'; 
import localeEsCl from '@angular/common/locales/es-CL';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID } from '@angular/core';

registerLocaleData(localeEsCl);

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(OAuthModule.forRoot()),
    provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
     { provide: LOCALE_ID, useValue: 'es-CL' },
     { provide: DEFAULT_CURRENCY_CODE, useValue: 'CLP' }
  ]
};
