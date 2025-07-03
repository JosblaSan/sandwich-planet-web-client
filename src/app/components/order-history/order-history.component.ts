import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { MatCardModule } from '@angular/material/card'; 
import { MatListModule } from '@angular/material/list'; 
import { MatIconModule } from '@angular/material/icon'; 
import { MatButtonModule } from '@angular/material/button'; 
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { HttpClientModule } from '@angular/common/http';
import { OrderHistoryService, Order, OrderItem } from '../../services/order-history/order-history.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { OrderDetailDialogComponent, OrderDetailDialogData } from '../order-detail-dialog/order-detail-dialog.component';

@Component({
  selector: 'app-order-history',
  standalone: true, 
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatToolbarModule
  ],
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {
  orders: Order[] = [];
  isLoading: boolean = true;
  errorMessage: string | null = null;

  constructor(
    private orderHistoryService: OrderHistoryService,
    private dialog: MatDialog
  ) { }

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

 // Modifica viewOrderDetails para abrir el diálogo
  viewOrderDetails(orderId: string, item: OrderItem): void {
    // Encuentra el pedido completo para pasarle el estado y fecha
    const order = this.orders.find(o => o.id === orderId);
    if (!order) {
      console.warn(`Pedido con ID ${orderId} no encontrado.`);
      return;
    }

    const dialogData: OrderDetailDialogData = {
      orderId: order.id,
      item: item, // Pasa el ítem completo, incluyendo las nuevas propiedades
      orderDate: order.date,
      orderStatus: order.status
    };

    this.dialog.open(OrderDetailDialogComponent, {
      width: '450px', // Ancho del diálogo
      data: dialogData // Pasa los datos al diálogo
    });
  }
}