import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SandwichService } from '../services/sandwich.service';
export interface Sandwich {
    id: number;
    nombre: string;
    origen: string;
    tipo: string;
    ingredientes: string[];
    atributos: {
      vegetariano: boolean;
      vegano: boolean;
      sin_gluten: boolean;
      picante: boolean;
    };
    calorias_aproximadas: number;
    precio: number;
    disponible: boolean;
    imagen_url?: string;
  }

@Component({
  selector: 'app-sandwich',
  standalone: true, 
  imports: [CommonModule], 
  templateUrl: './sandwich.component.html',
  styleUrls: ['./sandwich.component.scss']
})
export class SandwichComponent implements OnInit {

  sandwiches: Sandwich[] = [];
  errorMessage: string | null = null;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getSandwiches();
  }

  getSandwiches(): void {
    const jsonUrl = 'assets/sandwich.json';

    this.http.get<Sandwich[]>(jsonUrl).subscribe({
      next: (data: Sandwich[]) => {
        this.sandwiches = data;
        console.log('Sándwiches cargados exitosamente:', this.sandwiches);
      },
      error: (err) => {
        console.error('Error al cargar los datos de los sándwiches:', err);
        this.errorMessage = 'No se pudieron cargar los datos de los sándwiches. Por favor, inténtalo de nuevo más tarde.';
      }
    });
  }
  
}