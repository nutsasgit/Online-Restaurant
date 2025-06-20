// cart.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: any[] = [];

  getItems() {
    return this.cartItems;
  }

  addItem(item: any) {
    const existing = this.cartItems.find(i => i.id === item.id);
    if (existing) {
      existing.quantity++;
    } else {
      this.cartItems.push({ ...item, quantity: 1 });
    }
  }

  updateQuantity(id: number, delta: number) {
    const item = this.cartItems.find(i => i.id === id);
    if (item) {
      item.quantity += delta;
      if (item.quantity <= 0) this.removeItem(id);
    }
  }

  removeItem(id: number) {
    this.cartItems = this.cartItems.filter(item => item.id !== id);
  }

  getTotal() {
    return this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }
}

