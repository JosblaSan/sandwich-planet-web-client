import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';

// Tu configuración de OpenID Connect
export const authCodeFlowConfig: AuthConfig = {
  issuer: 'http://localhost:9000',
  requireHttps: false,
  redirectUri: 'http://localhost:4200/callback',
  clientId: 'client-app',
  responseType: 'code',
  strictDiscoveryDocumentValidation: false,
  scope: 'openid profile read write',
  showDebugInformation: true,
  disableAtHashCheck: true,
  disablePKCE: false
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private registerApiUrl = 'http://localhost:9000/api/usuarios/registro';

  constructor(private http: HttpClient, private oauthService: OAuthService) {
    // Configuración para OpenID Connect (login, logout, refresh de tokens)
    this.oauthService.configure(authCodeFlowConfig);
    this.oauthService.setupAutomaticSilentRefresh();
    // **IMPORTANTE**: NO LLAMES loadDiscoveryDocumentAndTryLogin() AQUÍ.
    // Se llamará a través del APP_INITIALIZER
  }

  // Método para registrar un nuevo usuario
  register(userData: any): Observable<any> {
    return this.http.post<any>(this.registerApiUrl, userData);
  }

  // Este método será llamado por APP_INITIALIZER
  public initAuth(): Promise<any> {
    // Solo intentar login si NO estamos en la página de registro o callback
    if (window.location.pathname.includes('/registro') || window.location.pathname.includes('/callback')) {
      return Promise.resolve(); // No hace nada si estamos en estas rutas
    }
    // Para cualquier otra ruta, intenta cargar el documento y el posible login
    return this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  // Métodos relacionados con OpenID Connect
  login() {
    this.oauthService.initLoginFlow();
  }

  logout() {
    this.oauthService.logOut();
  }

  get isLoggedIn(): boolean {
    return this.oauthService.hasValidAccessToken();
  }

  get identityClaims() {
    return this.oauthService.getIdentityClaims();
  }

  // Elimina loadDiscoveryDocumentAndTryLogin(callback: () => void) de aquí
  // ya que la lógica se movió a initAuth() para el APP_INITIALIZER.
  // Si la usas en algún otro lugar, deberías refactorizarlo para usar initAuth() directamente.

  getAccessToken() {
    return this.oauthService.getAccessToken();
  }
}