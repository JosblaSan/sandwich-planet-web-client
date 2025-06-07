import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Sandwich } from '../models/sandwich.model';

@Injectable({
  providedIn: 'root'
})
export class SandwichService {
  private sandwiches: Sandwich[] = [
    {
      "id": 1,
      "nombre": "Club Sandwich",
      "origen": "Estados Unidos",
      "tipo": "Clásico",
      "ingredientes": [
        "Pan de molde tostado",
        "Pechuga de pollo",
        "Tocino crujiente",
        "Lechuga",
        "Tomate",
        "Mayonesa",
        "Huevo duro (opcional)"
      ],
      "atributos": {
        "vegetariano": false,
        "vegano": false,
        "sin_gluten": false,
        "picante": false
      },
      "calorias_aproximadas": 550,
      "precio": 4650,
      "disponible": true,
      "imagen_url": "https://cdn0.uncomo.com/es/posts/0/6/9/como_hacer_un_sandwich_mixto_33960_orig.jpg"
    },
    {
      "id": 2,
      "nombre": "Sandwich Vegetariano",
      "origen": "Desconocido",
      "tipo": "Saludable",
      "ingredientes": [
        "Pan integral",
        "Hummus",
        "Aguacate",
        "Pepino",
        "Tomate",
        "Lechuga",
        "Pimientos asados"
      ],
      "atributos": {
        "vegetariano": true,
        "vegano": true,
        "sin_gluten": false,
        "picante": false
      },
      "calorias_aproximadas": 380,
      "precio": 6500,
      "disponible": true,
      "imagen_url": "https://www.midiariodecocina.com/wp-content/uploads/2021/03/Sandwich-de-huevo02.jpg"
    },
    {
      "id": 3,
      "nombre": "Cubano",
      "origen": "Cuba",
      "tipo": "Clásico",
      "ingredientes": [
        "Pan cubano",
        "Cerdo asado",
        "Jamón",
        "Queso suizo",
        "Mostaza",
        "Pepinillos"
      ],
      "atributos": {
        "vegetariano": false,
        "vegano": false,
        "sin_gluten": false,
        "picante": false
      },
      "calorias_aproximadas": 600,
      "precio": 7000,
      "disponible": true,
      "imagen_url": "https://www.unileverfoodsolutions.com.mx/dam/global-ufs/mcos/NOLA/calcmenu/recipes/MX-recipes/general/club-sandwich/main-header.jpg"
    }
  ];

  private nextId: number = 4; 

  getSandwiches(): Observable<Sandwich[]> {
    return of(this.sandwiches);
  }

  getSandwichById(id: number): Observable<Sandwich | undefined> {
    const sandwich = this.sandwiches.find(s => s.id === id);
    return of(sandwich);
  }

  addSandwich(sandwich: Sandwich): Observable<Sandwich> {
    const newSandwich = { ...sandwich, id: this.nextId++ };
    this.sandwiches.push(newSandwich);
    return of(newSandwich);
  }

  updateSandwich(updatedSandwich: Sandwich): Observable<Sandwich | undefined> {
    const index = this.sandwiches.findIndex(s => s.id === updatedSandwich.id);
    if (index > -1) {
      this.sandwiches[index] = updatedSandwich;
      return of(updatedSandwich);
    }
    return of(undefined); 
  }

  deleteSandwich(id: number): Observable<boolean> {
    const initialLength = this.sandwiches.length;
    this.sandwiches = this.sandwiches.filter(s => s.id !== id);
    return of(this.sandwiches.length < initialLength); 
  }
}