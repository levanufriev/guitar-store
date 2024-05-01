import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Basket, BasketItem, BasketTotals } from '../shared/models/basket';
import { Product } from '../shared/models/product';
import { DeliveryMethod } from '../shared/models/deliveryMethod';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  baseUrl = environment.apiUrl;
  private basketSource = new BehaviorSubject<Basket | null>(null);
  basket$ = this.basketSource.asObservable();
  private basketTotalSource = new BehaviorSubject<BasketTotals | null>(null);
  basketTotal$ = this.basketTotalSource.asObservable();
  shipping = 0;

  constructor(private http: HttpClient) { }

  setShippingPrice(deliveryMethod: DeliveryMethod) {
    this.shipping = deliveryMethod.price;
    this.calculateTotals();
  }

  getCurrentBasketValue() {
    return this.basketSource.value;
  }

  getBasket(id: string) {
    return this.http.get<Basket>(this.baseUrl + 'basket?id=' + id).subscribe({
      next: basket => {
        this.basketSource.next(basket);
        this.calculateTotals();
      }
    })
  }

  setBasket(basket: Basket) {
    return this.http.post<Basket>(this.baseUrl + 'basket', basket).subscribe({
      next: basket => {
        this.basketSource.next(basket);
        this.calculateTotals();
      }
    })
  }

  addItemToBasket(item: Product, quantity = 1) {
    const itemToAdd: BasketItem = this.mapProductItemToBasketItem(item, quantity);
    const basket = this.getCurrentBasketValue() ?? this.createBasket();
    basket.items = this.addOrUpdateItem(basket.items, itemToAdd, quantity);
    this.setBasket(basket);
  }

  private addOrUpdateItem(items: BasketItem[], itemToAdd: BasketItem, quantity: number): BasketItem[] {
    const item = items.find(x => x.id === itemToAdd.id);
    if (item) { 
      item.quantity += quantity;
    }
    else {
      itemToAdd.quantity = quantity;
      items.push(itemToAdd);
    }
    return items;
  }

  private createBasket(): Basket {
    const basket = new Basket();
    localStorage.setItem('basket_id', basket.id);
    return basket;
  }

  private mapProductItemToBasketItem(item: Product, quantity: number): BasketItem {
    return {
      id: item.id,
      name: item.name,
      price: item.price,
      quantity,
      pictureUrl: item.pictureUrl,
      brand: item.brand,
      category: item.category
    }
  }

  private calculateTotals() {
    const basket = this.getCurrentBasketValue();
    const shipping= this.shipping;
    const subtotal = basket!.items.reduce((a, b) => (b.price * b.quantity) + a, 0);
    const total = subtotal + shipping;
    this.basketTotalSource.next({shipping, total, subtotal});
  }

  incrementItemQuantity(item: BasketItem) {
    const basket = this.getCurrentBasketValue();
    const index = basket!.items.findIndex(x => x.id === item.id);
    basket!.items[index].quantity++;
    this.setBasket(basket!);
  }

  decrementItemQuantity(item: BasketItem) {
    const basket = this.getCurrentBasketValue();
    const index = basket!.items.findIndex(x => x.id === item.id);
    if(basket!.items[index].quantity>1) {
      basket!.items[index].quantity--;
      this.setBasket(basket!);
    } else {
      this.removeItemFromBasket(item);
    }
  }

  removeItemFromBasket(item: BasketItem) {
    const basket = this.getCurrentBasketValue();
    if(basket!.items.some(x => x.id === item.id)) {
      basket!.items = basket!.items.filter(i => i.id !== item.id);
      if(basket!.items.length>0) {
        this.setBasket(basket!);
      } else {
        this.deleteBasket(basket!);
      }
    }
  }

  deleteLocalBasket(id: string) {
    this.basketSource.next(null);
    this.basketTotalSource.next(null);
    localStorage.removeItem('basket_id');
  }

  deleteBasket(basket: Basket) {
    return this.http.delete(this.baseUrl + 'basket?id=' + basket.id).subscribe(() => {
      this.basketSource.next(null);
      this.basketTotalSource.next(null);
      localStorage.removeItem('basket_id');
    }, error => {
      console.log(error);
    });
  }

}
