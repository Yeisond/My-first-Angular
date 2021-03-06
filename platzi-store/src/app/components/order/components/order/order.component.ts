import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Product } from '../../../../product.model';
import { CartService } from '../../../../core/services/cart.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  products = [];

  displayedColumns = ['image', 'title', 'price', 'quantity', 'actions'];

  products$: Observable<Product[]>;

  constructor(
    private cartService: CartService
  ) {
    this.products$ = this.cartService.cart$;

    // elimina productos repetidos
    this.products$ = this.cartService.cart$.pipe(map((products: []) => {
      const distintos = [...new Set(products)];
      return distintos;
    }));
  }

  deleProduct(id: string) {
    this.cartService.deleteCart(id);
  }

  ngOnInit() {
  }

}
