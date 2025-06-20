import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SandwichControllerService, SandwichRequestDTO } from '../../services/sandwich-client';
import { AuthService } from '../../services/auth/auth.service';


@Component({
  selector: 'app-mantenedor',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="container mt-4">
      <h2>{{ isEditMode ? 'Editar' : 'Crear' }} Sándwich</h2>
      <form [formGroup]="sandwichForm" (ngSubmit)="onSubmit()">
        <div class="mb-3">
          <label for="nombre" class="form-label">Nombre</label>
          <input type="text" id="nombre" formControlName="nombre" class="form-control">
          <div *ngIf="sandwichForm.get('nombre')?.invalid && sandwichForm.get('nombre')?.touched" class="text-danger">
            El nombre es requerido.
          </div>
        </div>

        <div class="mb-3">
          <label for="origen" class="form-label">Origen</label>
          <input type="text" id="origen" formControlName="origen" class="form-control">
          <div *ngIf="sandwichForm.get('origen')?.invalid && sandwichForm.get('origen')?.touched" class="text-danger">
            El origen es requerido.
          </div>
        </div>

        <div class="mb-3">
          <label for="tipo" class="form-label">Tipo</label>
          <input type="text" id="tipo" formControlName="tipo" class="form-control">
          <div *ngIf="sandwichForm.get('tipo')?.invalid && sandwichForm.get('tipo')?.touched" class="text-danger">
            El tipo es requerido.
          </div>
        </div>

        <div class="mb-3">
          <label class="form-label">Ingredientes</label>
          <div formArrayName="ingredientes">
            <div *ngFor="let ingredienteControl of ingredientes.controls; let i = index" class="input-group mb-2">
              <input type="text" [formControlName]="i" class="form-control">
              <button type="button" class="btn btn-outline-danger" (click)="removeIngrediente(i)">X</button>
            </div>
            <button type="button" class="btn btn-secondary btn-sm" (click)="addIngrediente()">Agregar Ingrediente</button>
            <div *ngIf="ingredientes.invalid && ingredientes.touched" class="text-danger">
              Debe haber al menos un ingrediente y no puede estar vacío.
            </div>
          </div>
        </div>

        <div formGroupName="atributos" class="mb-3 border p-3 rounded">
          <h5 class="mb-3">Atributos</h5>
          <div class="form-check">
            <input type="checkbox" id="vegetariano" formControlName="vegetariano" class="form-check-input">
            <label for="vegetariano" class="form-check-label">Vegetariano</label>
          </div>
          <div class="form-check">
            <input type="checkbox" id="vegano" formControlName="vegano" class="form-check-input">
            <label for="vegano" class="form-check-label">Vegano</label>
          </div>
          <div class="form-check">
            <input type="checkbox" id="sin_gluten" formControlName="sin_gluten" class="form-check-input">
            <label for="sin_gluten" class="form-check-label">Sin Gluten</label>
          </div>
          <div class="form-check">
            <input type="checkbox" id="picante" formControlName="picante" class="form-check-input">
            <label for="picante" class="form-check-label">Picante</label>
          </div>
        </div>

        <div class="mb-3">
          <label for="calorias_aproximadas" class="form-label">Calorías Aproximadas</label>
          <input type="number" id="calorias_aproximadas" formControlName="calorias_aproximadas" class="form-control">
          <div *ngIf="sandwichForm.get('calorias_aproximadas')?.invalid && sandwichForm.get('calorias_aproximadas')?.touched" class="text-danger">
            Las calorías son requeridas y deben ser un número positivo.
          </div>
        </div>

        <div class="mb-3">
          <label for="precio" class="form-label">Precio</label>
          <input type="number" id="precio" formControlName="precio" class="form-control">
          <div *ngIf="sandwichForm.get('precio')?.invalid && sandwichForm.get('precio')?.touched" class="text-danger">
            El precio es requerido y debe ser un número positivo.
          </div>
        </div>

        <div class="mb-3">
          <label for="disponible" class="form-label">Disponible</label>
          <select id="disponible" formControlName="disponible" class="form-select">
            <option [ngValue]="true">Sí</option>
            <option [ngValue]="false">No</option>
          </select>
        </div>

        <div class="mb-3">
          <label for="imagen_url" class="form-label">URL de la Imagen</label>
          <input type="url" id="imagen_url" formControlName="imagen_url" class="form-control">
          <div *ngIf="sandwichForm.get('imagen_url')?.invalid && sandwichForm.get('imagen_url')?.touched" class="text-danger">
            La URL de la imagen es requerida y debe ser una URL válida.
          </div>
        </div>

        <button type="submit" [disabled]="sandwichForm.invalid" class="btn btn-success me-2">
          {{ isEditMode ? 'Guardar Cambios' : 'Crear Sándwich' }}
        </button>
        <button type="button" class="btn btn-secondary" (click)="goBack()">Cancelar</button>
      </form>
    </div>
  `,
  styleUrls: ['./mantenedor.component.scss']
})
export class MantenedorComponent  implements OnInit {
  sandwichForm!: FormGroup;
  isEditMode: boolean = false;
  sandwichId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private sandwichService: SandwichControllerService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.verificarRol();
    this.initForm();
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.sandwichId = +id;
        this.loadSandwichData(this.sandwichId);
      }
    });
  }

  initForm(): void {
    this.sandwichForm = this.fb.group({
      id: [null], 
      nombre: ['', Validators.required],
      origen: ['', Validators.required],
      tipo: ['', Validators.required],
      ingredientes: this.fb.array([], Validators.required),
      atributos: this.fb.group({
        vegetariano: [false],
        vegano: [false],
        sin_gluten: [false],
        picante: [false]
      }),
      calorias_aproximadas: [null, [Validators.required, Validators.min(0)]],
      precio: [null, [Validators.required, Validators.min(0)]],
      disponible: [true],
      imagen_url: ['', [Validators.required, Validators.pattern('^(http|https)://[^ "]+$')]]
    });
  }

  get ingredientes(): FormArray {
    return this.sandwichForm.get('ingredientes') as FormArray;
  }

  addIngrediente(): void {
    this.ingredientes.push(this.fb.control('', Validators.required));
  }

  removeIngrediente(index: number): void {
    this.ingredientes.removeAt(index);
  }

  loadSandwichData(id: number): void {
    this.sandwichService.obtenerPorId(id).subscribe(sandwich => {
      if (sandwich) {
        this.sandwichForm.patchValue(sandwich);
        
        this.ingredientes.clear(); 
        sandwich.ingredientes!.forEach(ing => this.ingredientes.push(this.fb.control(ing, Validators.required)));
      } else {
        alert('Sándwich no encontrado.');
        this.router.navigate(['/']);
      }
    });
  }

  onSubmit(): void {
    if (this.sandwichForm.valid) {
      const sandwichData: SandwichRequestDTO = this.sandwichForm.value;
      if (this.isEditMode && this.sandwichId) { 
        this.sandwichService.actualizar(this.sandwichId, sandwichData).subscribe(
          updatedSandwich => {
            if (updatedSandwich) {
              alert('Sándwich actualizado exitosamente!');
              this.router.navigate(['/']);
            } else {
              alert('Error al actualizar el sándwich.');
            }
          },
          error => console.error('Error al actualizar sandwich:', error)
        );
      } else {
        this.sandwichService.crearSandwich(sandwichData).subscribe(
          newSandwich => {
            if (newSandwich) {
              alert('Sándwich creado exitosamente!');
              this.router.navigate(['/']);
            } else {
              alert('Error al crear el sándwich.');
            }
          },
          error => console.error('Error al crear el sandwich:', error)
        );
      }
    } else {
      alert('Por favor, complete todos los campos requeridos y válidos.');
      this.sandwichForm.markAllAsTouched(); 
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}