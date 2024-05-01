import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BasketService } from '../../basket/basket.service';
import { CheckoutService } from '../checkout.service';
import { NavigationExtras, Router } from '@angular/router';
import { Order } from '../../shared/models/order';
import { Basket } from '../../shared/models/basket';

@Component({
  selector: 'app-checkout-review',
  templateUrl: './checkout-review.component.html',
  styleUrl: './checkout-review.component.css'
})
export class CheckoutReviewComponent {
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
      deliveryMethodId: this.checkoutForm!.get('deliveryForm')!.get('deliveryMethod')!.value,
      shipToAddress: this.checkoutForm.get('adressForm')!.value
    }
  }
}
