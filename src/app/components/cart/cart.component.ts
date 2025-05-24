import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CartItem, CartService } from '../../services/cart/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatTooltipModule,
    MatDividerModule,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent{

  private cartService = inject(CartService);
  private dialogRef = inject(MatDialogRef<CartComponent>);
  private router = inject(Router);

  // Columnas para la tabla
  displayedColumns: string[] = ["imagen", "nombre", "cantidad", "subtotal", "acciones"]

  // Obtener items del carrito usando signals
  cartItems = this.cartService.getCartItemsArray();

  dataSource = new MatTableDataSource<CartItem>([]);

  // Calcular total del carrito
  cartTotal = computed(() => this.cartService.getTotal());


  // Aumentar cantidad
  increaseQuantity(item: any) {
    this.cartService.updateQuantity(item, item.quantity + 1)
  }

  // Disminuir cantidad
  decreaseQuantity(item: any) {
    this.cartService.updateQuantity(item, item.quantity - 1)
  }

  // Eliminar item
  removeItem(productId: number) {
    this.cartService.removeFromCart(productId)
  }

  // Vaciar carrito
  clearCart() {
    this.cartService.clearCart()
  }

  // Finalizar compra
  checkout() {
    // Aquí iría la lógica para finalizar la compra
    this.router.navigate(['/checkout']);
    this.closeDialog()
  }

  // Cerrar diálogo
  closeDialog() {
    this.dialogRef.close()
  }
}
