import { Injectable } from '@angular/core';
import { Product } from '../shared/models/product';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Pagination } from '../shared/models/pagination';
import { Brand } from '../shared/models/brand';
import { Category } from '../shared/models/category';
import { map } from 'rxjs/operators';
import { ShopParams } from '../shared/models/shopParams';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = 'https://localhost:7232/api/';
  products: Product[] = [];
  
  constructor(private http: HttpClient) { }

  getProducts(shopParams: ShopParams) {
    let params = new HttpParams();

    if(shopParams.brandId > 0) {
      params = params.append('brandId', shopParams.brandId);
    }

    if(shopParams.categoryId > 0) {
      params = params.append('categoryId', shopParams.categoryId);
    }

    params = params.append('sort', shopParams.sort);
    params = params.append('pageIndex', shopParams.pageNumber.toString());
    params = params.append('pageSize', shopParams.pageSize.toString());
    if (shopParams.search){
      params = params.append('search', shopParams.search);
    } 

    return this.http.get<Pagination>(this.baseUrl + 'products', {observe: 'response', params})
      .pipe(
        map(response => {
          return response.body;
        })
      );
  }
  
  getProduct(id: number) {
    return this.http.get<Product>(this.baseUrl + 'products/' + id);
  }

  getBrands() {
    return this.http.get<Brand[]>(this.baseUrl + 'products/brands')
  }

  getCategories() {
    return this.http.get<Category[]>(this.baseUrl + 'products/categories')
  }
}
