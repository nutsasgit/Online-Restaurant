import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../../services/cart.service';


@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  allItems: any[] = [];
  filteredItems: any[] = [];

   
  //for Checkbox
  nuts: boolean = false;
  vegeterian: boolean = false;
  spicinessValue: number = 0;


  constructor(private http: HttpClient, private cartService: CartService) {}

  ngOnInit(): void {
    this.http
      .get<any[]>('https://restaurant.stepprojects.ge/api/Products/GetFiltered? ')
      .subscribe(data => {
        this.allItems = data;
        this.filteredItems = data;
      });
  }

  filterByCategory(categoryId: number | null): void {
    this.filteredItems = categoryId === null
      ? this.allItems
      : this.allItems.filter(item => item.categoryId === categoryId);
  }

 applyFilters(): void {
  this.filteredItems = this.allItems.filter(item =>
    item.spiciness === this.spicinessValue &&
    (!this.nuts || item.nuts) &&
    (!this.vegeterian || item.vegeterian)
  );
}

  resetFilters(): void {
    this.nuts = false;
    this.vegeterian = false;
    this.spicinessValue = 0;
    this.filteredItems = [...this.allItems];
  }

  addToCart(item: any) {
  this.cartService.addItem(item);
}

}
