import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  imageUrl?: string;    
  description?: string; 
}

export interface Order {
  id: string;
  date: Date;
  status: 'Pendiente' | 'En Proceso' | 'Completado' | 'Cancelado';
  total: number;
  items: OrderItem[];
}

@Injectable({
  providedIn: 'root'
})
export class OrderHistoryService {

  private mockOrders: Order[] = [
    {
      id: 'SP001',
      date: new Date('2024-05-10T14:30:00'),
      status: 'Completado',
      total: 10000,
      items: [
        { 
          name: 'Sándwich Clásico', 
          quantity: 2, 
          price: 5000, 
          imageUrl: 'https://www.watermelon.org/wp-content/uploads/2023/02/Sandwich_2023.jpg', // Ruta de tu imagen
          description: 'El clásico sándwich americano con pavo, tocino, lechuga y tomate.' 
        }

      ]
    },
    {
      id: 'SP002',
      date: new Date('2024-05-15T18:00:00'),
      status: 'Completado',
      total: 9000,
      items: [
        { 
          name: 'Sándwich Vegetariano', 
          quantity: 1, 
          price: 6000, 
          imageUrl: 'assets/images/vegetable-sandwich.jpg', // Ruta de tu imagen
          description: 'Delicioso sándwich con vegetales frescos y queso fundido.'
        },
        { 
          name: 'Jugo Natural', 
          quantity: 1, 
          price: 3000,
          imageUrl: 'assets/images/natural-juice.jpg', // Otra imagen de ejemplo
          description: 'Jugo de frutas 100% natural.'
        }
      ]
    },
    {
      id: 'SP003',
      date: new Date('2024-06-01T12:15:00'),
      status: 'En Proceso',
      total: 12000,
      items: [
        { 
          name: 'Combo Familiar', 
          quantity: 1, 
          price: 12000,
          imageUrl: 'assets/images/family-combo.jpg',
          description: 'Ideal para compartir, incluye 2 sándwiches y 2 bebidas.'
        }
      ]
    },
    {
      id: 'SP004',
      date: new Date('2024-06-10T09:45:00'),
      status: 'Cancelado',
      total: 7500,
      items: [
        { 
          name: 'Sándwich de Pollo', 
          quantity: 1, 
          price: 7500,
          imageUrl: 'assets/images/chicken-sandwich.jpg',
          description: 'Tiernas tiras de pollo a la plancha con aderezos.'
        }
      ]
    },
    {
      id: 'SP005',
      date: new Date('2024-06-17T20:00:00'),
      status: 'Pendiente',
      total: 8500,
      items: [
        { 
          name: 'Sándwich de Carne Mechada', 
          quantity: 1, 
          price: 7000,
          imageUrl: 'assets/images/pulled-pork-sandwich.jpg',
          description: 'Exquisita carne mechada en pan frica con mayonesa casera.'
        },
        { 
          name: 'Agua Mineral', 
          quantity: 1, 
          price: 1500,
          imageUrl: 'assets/images/water-bottle.jpg',
          description: 'Botella de agua mineral con o sin gas.'
        }
      ]
    },
  ];

  constructor() { }

  getOrders(): Observable<Order[]> {
    return of(this.mockOrders).pipe(delay(1000));
  }
}
