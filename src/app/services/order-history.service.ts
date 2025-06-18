import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators'; // Para simular un retardo de red

// Define las interfaces para la estructura de tus datos de pedido
export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
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

  // Datos simulados de pedidos
  private mockOrders: Order[] = [
    {
      id: 'SP001',
      date: new Date('2024-05-10T14:30:00'),
      status: 'Completado',
      total: 15500,
      items: [
        { name: 'Sándwich Clásico', quantity: 2, price: 5000 },
        { name: 'Papas Fritas Grandes', quantity: 1, price: 2500 },
        { name: 'Bebida Lata', quantity: 2, price: 1500 }
      ]
    },
    {
      id: 'SP002',
      date: new Date('2024-05-15T18:00:00'),
      status: 'Completado',
      total: 9000,
      items: [
        { name: 'Sándwich Vegetariano', quantity: 1, price: 6000 },
        { name: 'Jugo Natural', quantity: 1, price: 3000 }
      ]
    },
    {
      id: 'SP003',
      date: new Date('2024-06-01T12:15:00'),
      status: 'En Proceso',
      total: 12000,
      items: [
        { name: 'Combo Familiar', quantity: 1, price: 12000 }
      ]
    },
    {
      id: 'SP004',
      date: new Date('2024-06-10T09:45:00'),
      status: 'Cancelado',
      total: 7500,
      items: [
        { name: 'Sándwich de Pollo', quantity: 1, price: 7500 }
      ]
    },
    {
      id: 'SP005',
      date: new Date('2024-06-17T20:00:00'),
      status: 'Pendiente',
      total: 8500,
      items: [
        { name: 'Sándwich de Carne Mechada', quantity: 1, price: 7000 },
        { name: 'Agua Mineral', quantity: 1, price: 1500 }
      ]
    },
  ];

  constructor() { }

  /**
   * Simula la obtención del historial de pedidos de un usuario.
   * En una aplicación real, aquí harías una llamada HTTP.
   * @returns Un Observable de un array de pedidos.
   */
  getOrders(): Observable<Order[]> {
    // Retornamos un Observable de los pedidos simulados con un pequeño retraso
    // para simular una llamada de red.
    return of(this.mockOrders).pipe(delay(1000));
  }
}