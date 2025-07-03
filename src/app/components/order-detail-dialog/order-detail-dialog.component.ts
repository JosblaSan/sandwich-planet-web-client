import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { OrderItem } from '../../services/order-history/order-history.service';

export interface OrderDetailDialogData {
  orderId: string;
  item: OrderItem & { imageUrl?: string; description?: string }; // Extiende OrderItem con propiedades de imagen/descripción
  orderDate: Date;
  orderStatus: string;
}

@Component({
  selector: 'app-order-detail-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule, // Necesario para componentes de diálogo
    MatButtonModule,
    MatIconModule,
    MatDividerModule
  ],
  templateUrl: './order-detail-dialog.component.html',
  styleUrls: ['./order-detail-dialog.component.scss']
})
export class OrderDetailDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<OrderDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OrderDetailDialogData
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
