import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { SandwichControllerService, SandwichesMetadataDTO } from '../../services/sandwich-client';

@Component({
  selector: 'app-sandwich-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
  <div class="container">
   <h2>Lista de Sándwiches</h2>
    <button [routerLink]="['/create']" class="btn btn-primary mb-3">Crear Nuevo Sándwich</button>
    <div *ngIf="sandwiches.sandwiches" class="alert alert-info">
         No hay sándwiches disponibles.
      </div>
      <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        <div class="col" *ngFor="let sandwich of sandwiches.sandwiches">
          <div class="card h-100 shadow-sm">
            <img [src]="sandwich.imagenUrl" class="card-img-top" alt="{{ sandwich.nombre }}">
            <div class="card-body">
              <h5 class="card-title">{{ sandwich.nombre }}</h5>
              <p class="card-text"><strong>Origen:</strong> {{ sandwich.origen }}</p>
              <p class="card-text"><strong>Tipo:</strong> {{ sandwich.tipo }}</p>
              <p class="card-text"><strong>Precio:</strong> {{ sandwich.precio | currency:'CLP':'symbol':'1.0-0' }}</p>
              <div class="d-flex justify-content-between align-items-center">
                <button [routerLink]="['/edit', sandwich.id]" class="btn btn-sm btn-warning">Editar</button>
                <button (click)="deleteSandwich(sandwich.id!)" class="btn btn-sm btn-danger">Eliminar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
`,
  styleUrls: ['./sandwich-list.component.scss']
})
export class SandwichListComponent implements OnInit {
  @Input() sandwiches: SandwichesMetadataDTO = { sandwiches: [], metadata: {} };

  constructor(private sandwichService: SandwichControllerService, private router: Router) {}

  ngOnInit(): void {
  }

  deleteSandwich(id: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar este sándwich?')) {
      this.sandwichService.eliminar(id).subscribe(success => {
        if (success) {
          alert('Sándwich eliminado correctamente.');
          this.router.navigate(['/dashboard']);
        } else {
          alert('Error al eliminar el sándwich.');
        }
      });
    }
  }
}