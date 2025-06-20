import { Component, EventEmitter, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IngredienteControllerService, IngredienteDTo, OrigenControllerService, OrigenDTO, SandwichControllerService, SandwichRequestDTO, SandwichResponseDTO, TipoControllerService, TipoDto } from '../../services/sandwich-client';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';


@Component({
  selector: 'app-crear-sandwich',
  imports: [ReactiveFormsModule, CommonModule, NgSelectModule],
  templateUrl: './crear-sandwich.component.html',
  styleUrl: './crear-sandwich.component.scss'
})
export class CrearSandwichComponent {
  // Aquí puedes definir las propiedades y métodos necesarios para tu componente
  sandwichForm!: FormGroup;
  isEditMode: boolean = false;
  sandwichId: number | null = null;
  inputTipo: EventEmitter<string> = new EventEmitter<string>();
  inputOrigen: EventEmitter<string> = new EventEmitter<string>();

  tipos: TipoDto[] = [];
  paises: OrigenDTO[] = [];
  ingredientesDisponibles: IngredienteDTo[] = [];

  tipo:number | null = null;
  pais:number | null = null;

  constructor(
    private fb: FormBuilder,
    private sandwichService: SandwichControllerService,
    private route: ActivatedRoute,
    private router: Router,
    private tipoService: TipoControllerService,
    private origenService: OrigenControllerService,
    private ingredientesService: IngredienteControllerService
  ) {
    // Inicialización del componente
  }

  ngOnInit(): void {
    this.initForm();
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.sandwichId = +id;
        this.loadSandwichData(this.sandwichId);
      }

      this.tipoService.getAll().subscribe(data => this.tipos = data);
      this.origenService.getAll1().subscribe(data => this.paises = data);
      this.ingredientesService.getAll2().subscribe(data => this.ingredientes = data);
    });

    this.sandwichForm.get('tipoSeleccionado')!.valueChanges.subscribe(valor => {
      this.tipo = valor;
    });
    this.sandwichForm.get('origenSeleccionado')!.valueChanges.subscribe(valor => {
      this.pais = valor;
    });
  }

  initForm(): void {
    this.sandwichForm = this.fb.group({
      id: [null],
      nombre: ['', Validators.required],
      origenSeleccionado: [null],
      tipoSeleccionado: [null], // Valor inicial,
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

  set ingredientes(ingredientes: IngredienteDTo[]) {
    this.ingredientesDisponibles = ingredientes;
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

    if (!this.validateForm()) return;
    this.crearOActualizarSandwich();

  }

  validateForm(): boolean {
    if (!this.sandwichForm.valid) {
      alert('Por favor, complete todos los campos requeridos y válidos.');
      this.sandwichForm.markAllAsTouched();
      return false;
    }
    return true;
  }

  crearOActualizarSandwich() {
    const sandwichData: SandwichResponseDTO = this.sandwichForm.value;
      const ingredientesIds = sandwichData.ingredientes!.map((nombreIng: string) => {
        return this.ingredientesDisponibles.find(ing => ing.nombre === nombreIng)?.id;
      }).filter(id => id !== undefined) as number[];

      const sandwichRequest: SandwichRequestDTO = this.setSandwichData(sandwichData, this.tipo!, this.pais!, ingredientesIds);

      if (!this.isEditMode && !this.sandwichId) {

        this.sandwichService.crearSandwich(sandwichRequest).subscribe({
          next: (newSandwich: SandwichResponseDTO) => {
            if (newSandwich) {
              alert('Sándwich creado exitosamente!');
              this.router.navigate(['/']);
            } else {
              alert('Error al crear el sándwich.');
            }
          },
          error: error => console.error('Error al crear el sandwich:', error)
        });
        return;
      }

      this.sandwichService.actualizar(this.sandwichId!, sandwichRequest).subscribe({
        next: updatedSandwich => {
          if (updatedSandwich) {
            alert('Sándwich actualizado exitosamente!');
            this.router.navigate(['/']);
          } else {
            alert('Error al actualizar el sándwich.');
          }
        },
        error: error => console.error('Error al actualizar sandwich:', error)
      });
  }

  setSandwichData(sandwichData: SandwichResponseDTO, tipoId: number, paisId: number, ingredientesIds: number[]): SandwichRequestDTO {
    return {
      nombre: sandwichData.nombre,
      descripcion: sandwichData.descripcion,
      tipoId: tipoId!,
      paisId: paisId!,
      ingredientesIds: ingredientesIds,
      vegetariano: sandwichData.vegetariano,
      caloriasAproximadas: sandwichData.caloriasAproximadas,
      precio: sandwichData.precio,
      disponible: sandwichData.disponible,
      imagenUrl: sandwichData.imagenUrl
    };
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

}
