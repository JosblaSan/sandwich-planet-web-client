import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { SandwichService } from './../services/sandwich.service';
import { Sandwich } from './../models/sandwich.model';

@Component({
  selector: 'app-sandwich-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
  <div class="container">
   <h2>Lista de Sándwiches</h2>
    <button [routerLink]="['/create']" class="btn btn-primary mb-3">Crear Nuevo Sándwich</button>
    <div *ngIf="sandwiches.length === 0" class="alert alert-info">
         No hay sándwiches disponibles.
      </div>
      <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        <div class="col" *ngFor="let sandwich of sandwiches">
          <div class="card h-100 shadow-sm">
            <img [src]="sandwich.imagen_url" class="card-img-top" alt="{{ sandwich.nombre }}">
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
  sandwiches: Sandwich[] = [];

  constructor(private sandwichService: SandwichService) {}

  ngOnInit(): void {
    this.loadSandwiches();
  }

  loadSandwiches(): void {
    this.sandwichService.getSandwiches().subscribe(data => {
      this.sandwiches = data;
    });
  }

  deleteSandwich(id: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar este sándwich?')) {
      this.sandwichService.deleteSandwich(id).subscribe(success => {
        if (success) {
          alert('Sándwich eliminado correctamente.');
          this.loadSandwiches(); 
        } else {
          alert('Error al eliminar el sándwich.');
        }
      });
    }
  }
}