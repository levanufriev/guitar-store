import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BasketService } from '../../../basket/basket.service';
import { Observable } from 'rxjs';
import { Basket, BasketItem } from '../../models/basket';

@Component({
  selector: 'app-basket-summary',
  templateUrl: './basket-summary.component.html',
  styleUrl: './basket-summary.component.css'
})
export class BasketSummaryComponent implements OnInit {
  basket$!: Observable<Basket | null>;
  @Output() decrement: EventEmitter<BasketItem> = new EventEmitter<BasketItem>();
  @Output() increment: EventEmitter<BasketItem> = new EventEmitter<BasketItem>();
  @Output() remove: EventEmitter<BasketItem> = new EventEmitter<BasketItem>();
  @Input() isBasket = true;

  constructor(private basketService: BasketService) { }

  ngOnInit(): void {
    this.basket$ = this.basketService.basket$!;
  }

  decrementItemQuantity(item: BasketItem) {
    this.decrement.emit(item);
  }

  incrementItemQuantity(item: BasketItem) {
    this.increment.emit(item);
  }

  removeBasketItem(item: BasketItem) {
    this.remove.emit(item);
  }
}
