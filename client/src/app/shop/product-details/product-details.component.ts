import { Component } from '@angular/core';
import { Product } from '../../shared/models/product';
import { ShopService } from '../shop.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  product!: Product;

  constructor(private shopService: ShopService, private activatedRoute: ActivatedRoute) { } 

  ngOnInit() {
    console.log(this.activatedRoute.snapshot.params['id']);
    this.loadProduct();
  }

  loadProduct() {
    this.shopService.getProduct(+this.activatedRoute.snapshot.params['id']!).subscribe(product => {
      this.product = product;
    }, error => {
      console.log(error);
    })
  }
}
