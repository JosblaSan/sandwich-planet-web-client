import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';

export const authCodeFlowConfig: AuthConfig = {
  issuer: 'http://localhost:9000', // tu Spring Auth Server
  requireHttps: false, 
  redirectUri: 'http://localhost:4200/callback',
  clientId: 'client-app',
  responseType: 'code',
  strictDiscoveryDocumentValidation: false,
  scope: 'openid profile read write',
  showDebugInformation: true,
  disableAtHashCheck: true, // por compatibilidad local
  disablePKCE: false
};

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private oauthService: OAuthService) {
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
}
