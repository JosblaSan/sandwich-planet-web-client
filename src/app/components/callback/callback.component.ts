import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-callback',
  imports: [],
  templateUrl: './callback.component.html',
  styleUrl: './callback.component.scss'
})
export class CallbackComponent {
  constructor(private auth: AuthService, @Inject(Router) private router: Router) {}

  ngOnInit() {
    const _this = this;
    this.auth.loadDiscoveryDocumentAndTryLogin(() => {
      if (!_this.auth.isLoggedIn) {
        // Si falla, redirige al login
        window.location.href = "http://localhost:9000/login";
        return;
      }
        const accessToken = _this.auth.getAccessToken();
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
    );
  }
}
