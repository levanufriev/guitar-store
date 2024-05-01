import { Component } from '@angular/core';
import { BasketService } from './basket.service';
import { Basket, BasketItem } from '../shared/models/basket';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.css'
})
export class BasketComponent {
  basket$!: Observable<Basket | null>;

  constructor(private basketService: BasketService){ }

  ngOnInit() {
    this.basket$ = this.basketService.basket$;
  }

  removeBasketItem(item: BasketItem) {
    this.basketService.removeItemFromBasket(item);
  }

  incrementItemQuantity(item: BasketItem) {
    this.basketService.incrementItemQuantity(item);
  }

  decrementItemQuantity(item: BasketItem) {
    this.basketService.decrementItemQuantity(item);
  }
}
