import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-callback',
  imports: [],
  templateUrl: './callback.component.html',
  styleUrl: './callback.component.scss'
})
export class CallbackComponent {
  constructor(private router: Router, private oauthService: OAuthService, private auth: AuthService) {}


  ngOnInit(): void {
    // El `OAuthService` procesa automáticamente el código de autorización
    // de la URL cuando el componente `CallbackComponent` se carga.
    // Simplemente necesitamos esperar un poco y luego redirigir.

    // Usamos setTimeout para dar tiempo al OAuthService a procesar el callback
    // y obtener los tokens después de la redirección desde el Auth Server.
    setTimeout(() => {
      // Verifica si el login fue exitoso y el usuario tiene un token válido.
      if (this.auth.isLoggedIn) {
        const accessToken = this.auth.getAccessToken();

        if (accessToken) {
          try {
            const payloadBase64 = accessToken.split('.')[1];
            const payloadJson = atob(payloadBase64);
            const payload = JSON.parse(payloadJson);

            // Redirige según los roles o a una página predeterminada
            if (payload.roles && Array.isArray(payload.roles) && payload.roles.includes('ROLE_read')) {
              this.router.navigate(['/']); // Redirige a la página principal
            } else {
              this.router.navigate(['/dashboard']); // Si el rol no es 'ROLE_read', redirige al dashboard
            }
          } catch (e) {
            console.error('Error al decodificar o parsear el token de acceso:', e);
            this.router.navigate(['/']); // En caso de error, redirige a la página principal o de error
          }
        } else {
          console.error('No se pudo obtener el Access Token después del login.');
          this.router.navigate(['/']); // Redirige si no hay token
        }
      } else {
        // Si el login no fue exitoso (por ejemplo, el usuario canceló la autorización)
        console.warn('El usuario no ha iniciado sesión después del callback.');
        // Puedes redirigir a una página de error o al login nuevamente.
        this.router.navigate(['/']); // Redirige a la página principal o de login
      }
    }, 100); // Pequeño retraso de 100ms para asegurar que el OAuthService procese la URL
  }
}