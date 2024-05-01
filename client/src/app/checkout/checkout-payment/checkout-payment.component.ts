import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BasketService } from '../../basket/basket.service';
import { CheckoutService } from '../checkout.service';
import { Basket } from '../../shared/models/basket';
import { Order } from '../../shared/models/order';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrl: './checkout-payment.component.css'
})
export class CheckoutPaymentComponent{
  @Input() checkoutForm!: FormGroup;
  
  constructor(private basketService: BasketService, 
    private checkoutService: CheckoutService,
    private router: Router
  ) { }

  submitOrder() {
    const basket = this.basketService.getCurrentBasketValue();
    const orderToCreate = this.getOrderToCreate(basket!);
    this.checkoutService.createOrder(orderToCreate).subscribe((order: Order) => {
      this.basketService.deleteLocalBasket(basket!.id);
      const navigationExtras: NavigationExtras = {state: order};
      this.router.navigate(['checkout/success'], navigationExtras);
    })

  }

  private getOrderToCreate(basket: Basket) {
    return {
      basketId: basket.id,
      deliveryMethodId: +this.checkoutForm.get('deliveryForm')!.get('delivery')!,
      shipToAddress: this.checkoutForm.get('adressForm')!.value
    }
  }
}
