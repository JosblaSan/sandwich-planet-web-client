// Cambios mínimos y funcionales
import { Component, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IngredienteControllerService, IngredienteDTo, OrigenControllerService, OrigenDTO, SandwichControllerService, SandwichRequestDTO, SandwichResponseDTO, TipoControllerService, TipoDto } from '../../services/sandwich-client';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-crear-sandwich',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgSelectModule],
  templateUrl: './crear-sandwich.component.html',
  styleUrl: './crear-sandwich.component.scss'
})
export class CrearSandwichComponent {
  sandwichForm!: FormGroup;
  isEditMode = false;
  sandwichId: number | null = null;

  inputTipo = new EventEmitter<string>();
  inputOrigen = new EventEmitter<string>();
  inputIngrediente = new EventEmitter<string>();

  tipos: TipoDto[] = [];
  paises: OrigenDTO[] = [];
  ingredientesDisponibles: IngredienteDTo[] = [];

  constructor(
    private fb: FormBuilder,
    private sandwichService: SandwichControllerService,
    private route: ActivatedRoute,
    private router: Router,
    private tipoService: TipoControllerService,
    private origenService: OrigenControllerService,
    private ingredientesService: IngredienteControllerService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.tipoService.getAll()
      .subscribe(data => {
        this.tipos = data;
        this.origenService.getAll1().subscribe(data => {
          this.paises = data;
          this.ingredientesService.getAll2().subscribe(data => {
            this.ingredientesDisponibles = data
            this.route.paramMap.subscribe(params => {
              const id = params.get('id');
              if (id) {
                this.authService.verificarRol(`edit/${id}`, ['ROLE_admin']);
                this.isEditMode = true;
                this.sandwichId = +id;
                this.loadSandwichData(this.sandwichId);
                return;
              }
              this.authService.verificarRol('create', ['ROLE_admin']);
            });
          });
        });
      });
  }

  initForm(): void {
    this.sandwichForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      origenSeleccionado: [null, Validators.required],
      tipoSeleccionado: [null, Validators.required],
      ingredientesSeleccionados: [[], Validators.required],
      atributos: this.fb.group({
        vegetariano: [false],
        vegano: [false],
        sin_gluten: [false],
        picante: [false]
      }),
      calorias_aproximadas: [null, [Validators.required, Validators.min(0)]],
      precio: [null, [Validators.required, Validators.min(0)]],
      disponible: [true],
      imagen_url: ['', [Validators.required, Validators.pattern("^(http|https)://[^ \"']+$")]]
    });
  }

  loadSandwichData(id: number): void {
    this.sandwichService.obtenerPorId(id).subscribe(sandwich => {
      if (!sandwich) {
        alert('Sándwich no encontrado.');
        this.router.navigate(['/dashboard']);
        return;
      }

      this.sandwichForm.patchValue({
        nombre: sandwich.nombre,
        descripcion: sandwich.descripcion,
        origenSeleccionado: this.paises.find(p=>p.nombre == sandwich.origen)?.id,
        tipoSeleccionado: this.tipos.find(t=>t.nombre == sandwich.tipo)?.id,
        ingredientesSeleccionados:sandwich.ingredientes
          ?.map(nombre => this.ingredientesDisponibles.find(i => i.nombre === nombre)?.id)
          .filter((id): id is number => id !== undefined),
        atributos: {
          vegetariano: sandwich.vegetariano || false,
        },
        calorias_aproximadas: sandwich.caloriasAproximadas,
        precio: sandwich.precio,
        disponible: sandwich.disponible,
        imagen_url: sandwich.imagenUrl
      });
    });
  }

  onSubmit(): void {
    if (this.sandwichForm.invalid) {
      this.sandwichForm.markAllAsTouched();
      alert('Por favor, complete todos los campos requeridos y válidos.');
      return;
    }

    const form = this.sandwichForm.value;
    const request: SandwichRequestDTO = {
      nombre: form.nombre,
      descripcion: form.descripcion,
      tipoId: form.tipoSeleccionado,
      paisId: form.origenSeleccionado,
      ingredientesIds: form.ingredientesSeleccionados,
      vegetariano: form.atributos.vegetariano,
      caloriasAproximadas: form.calorias_aproximadas,
      precio: form.precio,
      disponible: form.disponible,
      imagenUrl: form.imagen_url
    };

    const obs = this.isEditMode && this.sandwichId
      ? this.sandwichService.actualizar(this.sandwichId, request)
      : this.sandwichService.crearSandwich(request);

    obs.subscribe({
      next: _ => {
        alert(`Sándwich ${this.isEditMode ? 'actualizado' : 'creado'} exitosamente!`);
        this.router.navigate(['/dashboard']);
      },
      error: err => console.error('Error:', err)
    });
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }
}
