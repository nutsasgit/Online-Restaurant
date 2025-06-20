// cart.component.ts
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  totalPrice: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getItems();
    this.updateTotal();
  }

  increment(id: number) {
    this.cartService.updateQuantity(id, 1);
    this.updateTotal();
  }

  decrement(id: number) {
    this.cartService.updateQuantity(id, -1);
    this.cartItems = this.cartService.getItems(); // in case item gets removed
    this.updateTotal();
  }

  delete(id: number) {
    this.cartService.removeItem(id);
    this.cartItems = this.cartService.getItems();
    this.updateTotal();
  }

  updateTotal() {
    this.totalPrice = this.cartService.getTotal();
  }
}
