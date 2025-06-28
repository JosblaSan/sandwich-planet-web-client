import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../services/auth/auth.service'; // Tu servicio que se comunica con el backend
import { Router } from '@angular/router'; // Para la navegación después del registro

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent implements OnInit {
  registroForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registroForm = this.fb.group({
      username: ['', Validators.required],
      apellidoPat: ['', Validators.required],
      apellidoMat: [''], // Campo opcional
      rut: ['', Validators.required], // Considerar validador de RUT más adelante
      telefono: [''], // Campo opcional
      mail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      // No incluyas 'direcciones' ni 'roles' aquí si los manejarás en el backend o post-registro
    }, { validator: this.passwordMatchValidator });
  }

  // Validador personalizado para asegurar que las contraseñas coincidan
  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }

  onSubmit(): void {
    if (this.registroForm.valid) {
      // Extrae solo los campos que enviarás al backend
      const {
        username,
        apellidoPat,
        apellidoMat,
        rut,
        telefono,
        mail,
        password,
      } = this.registroForm.value;

      this.authService.register({
        username,
        apellidoPat,
        apellidoMat,
        rut,
        telefono,
        mail,
        password,
        // No enviar 'direcciones' ni 'roles' desde el frontend si el backend los asigna
      }).subscribe({
        next: (response) => {
          console.log('Registro exitoso:', response);
          alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
          this.router.navigate(['/login']); // Redirige al usuario a la página de login
        },
        error: (error) => {
          console.error('Error durante el registro:', error);
          let errorMessage = 'Algo salió mal durante el registro.';

          // Manejo de errores específicos del backend (HTTP 409 Conflict o 400 Bad Request)
          if (error.status === 409 && error.error && error.error.message) {
            errorMessage = error.error.message; // Mensaje de ResourceAlreadyExistsException
          } else if (error.status === 400 && error.error) {
            errorMessage = 'Errores de validación:';
            for (const fieldName in error.error) {
                if (error.error.hasOwnProperty(fieldName)) {
                    errorMessage += `\n- ${fieldName}: ${error.error[fieldName]}`;
                }
            }
          } else if (error.error && error.error.message) {
            errorMessage = error.error.message;
          } else if (error.message) {
            errorMessage = error.message;
          }

          alert(`Error al registrar usuario: ${errorMessage}`);
          // Aquí puedes implementar una lógica para mostrar los errores bajo los campos específicos
        },
      });
    } else {
      this.registroForm.markAllAsTouched(); // Marca todos los campos como tocados para mostrar errores
      console.log('El formulario no es válido.');
    }
  }
}