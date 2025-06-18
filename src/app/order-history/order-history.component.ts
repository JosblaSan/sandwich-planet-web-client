import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { MatCardModule } from '@angular/material/card'; 
import { MatListModule } from '@angular/material/list'; 
import { MatIconModule } from '@angular/material/icon'; 
import { MatButtonModule } from '@angular/material/button'; 
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { HttpClientModule } from '@angular/common/http';
import { OrderHistoryService, Order } from '../services/order-history.service';

@Component({
  selector: 'app-order-history',
  standalone: true, 
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule
  ],
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {
  orders: Order[] = [];
  isLoading: boolean = true;
  errorMessage: string | null = null;

  constructor(private orderHistoryService: OrderHistoryService) { }

  ngOnInit(): void {
    this.loadOrderHistory();
  }

  loadOrderHistory(): void {
    this.isLoading = true;
    this.errorMessage = null;
    this.orderHistoryService.getOrders().subscribe({
      next: (data) => {
        this.orders = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al cargar el historial de pedidos:', err);
        this.errorMessage = 'No se pudo cargar el historial de pedidos. Por favor, inténtalo de nuevo más tarde.';
        this.isLoading = false;
      }
    });
  }

  viewOrderDetails(orderId: string): void {
    console.log(`Ver detalles del pedido: ${orderId}`);
  }
}
