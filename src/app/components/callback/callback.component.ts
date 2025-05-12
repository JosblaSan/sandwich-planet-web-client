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
      if (_this.auth.isLoggedIn) {
        // Redirige a la ruta protegida o página principal
        this.router.navigate(['/dashboard']); // Cambia '/dashboard' por tu ruta deseada
      } else {
        // Si falla, redirige al login
        window.location.href = "http://localhost:9000/login"
      }
    });
  }
}
