import { Injectable, signal } from '@angular/core';
import { Item, SandwichResumenDTO } from '../sandwich-client/model/models';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItems = signal<CartItem[]>([]);

  constructor(private snackBar: MatSnackBar) { }

  // Getter para los items del carrito
  getCartItems() {
    return this.cartItems.asReadonly();
  }

  public getCartItemsArray(): CartItem[] {
    return this.cartItems();
  }

  // Añadir producto al carrito
  addToCart(product: SandwichResumenDTO) {
    if (!product.disponible) {
      this.snackBar.open("Este producto no está disponible", "Cerrar", {
        duration: 3000,
      })
      return
    }

    const items = this.cartItems()
    const existingItem = items.find((item) => item.product.id === product.id)

    if (existingItem) {
      // Actualizar cantidad si ya existe
      this.updateQuantity(existingItem, existingItem.quantity + 1)
    } else {
      // Añadir nuevo item
      this.cartItems.update((items) => [...items, { product, quantity: 1 }])
      this.snackBar.open(`${product.nombre} añadido al carrito`, "Cerrar", {
        duration: 2000,
      })
    }
  }

  // Actualizar cantidad
  updateQuantity(item: CartItem, newQuantity: number) {
    if (newQuantity <= 0) {
      this.removeFromCart(item.product.id!)
      return
    }

    this.cartItems.update((items) =>
      items.map((cartItem) =>
        cartItem.product.id === item.product.id ? { ...cartItem, quantity: newQuantity } : cartItem,
      ),
    )
  }

  // Eliminar producto del carrito
  removeFromCart(productId: number) {
    const items = this.cartItems()
    const itemToRemove = items.find((item) => item.product.id === productId)

    if (itemToRemove) {
      this.cartItems.update((items) => items.filter((item) => item.product.id !== productId))
      this.snackBar.open(`${itemToRemove.product.nombre} eliminado del carrito`, "Cerrar", {
        duration: 2000,
      })
    }
  }

  // Limpiar carrito
  clearCart() {
    this.cartItems.set([])
    this.snackBar.open("Carrito vacío", "Cerrar", {
      duration: 2000,
    })
  }

  // Calcular total
  getTotal() {
    return this.cartItems().reduce((total, item) => total + (item.product.precio || 0) * item.quantity, 0)
  }

  // Obtener cantidad total de productos
  getTotalQuantity() {
    return this.cartItems().reduce((total, item) => total + item.quantity, 0)
  }
}

export interface CartItem {
  product: SandwichResumenDTO;
  quantity: number;
}
