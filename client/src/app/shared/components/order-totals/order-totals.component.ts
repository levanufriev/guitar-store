import { Component, OnInit } from '@angular/core';
import { BasketService } from '../../../basket/basket.service';
import { Observable } from 'rxjs';
import { BasketTotals } from '../../models/basket';

@Component({
  selector: 'app-order-totals',
  templateUrl: './order-totals.component.html',
  styleUrl: './order-totals.component.css'
})
export class OrderTotalsComponent implements OnInit {
  basketTotal$!: Observable<BasketTotals | null>;

  constructor(public basketService: BasketService){}

  ngOnInit() {
    this.basketTotal$ = this.basketService.basketTotal$;
  }
}
