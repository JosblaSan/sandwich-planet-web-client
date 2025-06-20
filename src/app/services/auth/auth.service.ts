import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';

export const authCodeFlowConfig: AuthConfig = {
  issuer: 'https://localhost:9000', // tu Spring Auth Server
  requireHttps: false, 
  redirectUri: 'https://localhost:4200/callback',
  clientId: 'client-app',
  responseType: 'code',
  strictDiscoveryDocumentValidation: false,
  scope: 'openid profile read write',
  showDebugInformation: true,
  disableAtHashCheck: true, // por compatibilidad local
  disablePKCE: false,
  useHttpBasicAuth: false,
};

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private oauthService: OAuthService, private router: Router) {
    this.oauthService.configure(authCodeFlowConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
    this.oauthService.setupAutomaticSilentRefresh();
  }

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

  loadDiscoveryDocumentAndTryLogin(callback: () => void) {
    this.oauthService.loadDiscoveryDocumentAndTryLogin().then(() => {
      callback();
      }).catch((error) => {
        console.log(error)
      });
  }

  getAccessToken() {
    return this.oauthService.getAccessToken();
  }

  verificarRol(){
    const accessToken = this.getAccessToken();
        if (!accessToken) {
          console.error('No hay access token');
          return;
        }
        // Decodifica el payload del Access Token (sin verificar firma)
        const payloadBase64 = accessToken.split('.')[1];
        const payloadJson = atob(payloadBase64);
        const payload = JSON.parse(payloadJson);
        // Redirige a la ruta protegida o página principal
        if (payload.roles.includes('ROLE_read')) {
          this.router.navigate(['/']); // redirige a la página principal
          return;
        }

        this.router.navigate(['/dashboard']); // si el rol no es 'ROLE_read', redirige al dashboard
  }
}
