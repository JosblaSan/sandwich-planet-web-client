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
    this.oauthService.setStorage(sessionStorage);
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

  verificarRol(rutaDeseada: string, rolesPermitidos: string[] = []): void {
    const accessToken = this.getAccessToken();
    if (!accessToken) {
      console.error('No hay access token');
      this.router.navigate(['/login']);
      return;
    }

    try {
      const payloadBase64 = accessToken.split('.')[1];
      const payloadJson = atob(payloadBase64);
      const payload = JSON.parse(payloadJson);

      const rolesUsuario: string[] = payload.roles || [];

      const tienePermiso = rolesPermitidos.length === 0 || rolesUsuario.some(rol => rolesPermitidos.includes(rol));

      if (tienePermiso) {
        this.router.navigate([rutaDeseada]);
      } else {
        this.router.navigate(['/']); // o alguna ruta de acceso denegado
      }

    } catch (error) {
      console.error('Error al decodificar el token:', error);
      this.router.navigate(['/']);
    }
  }

}
