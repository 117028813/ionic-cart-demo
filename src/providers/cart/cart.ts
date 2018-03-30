import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiProvider } from '../api/api';

/*
  Generated class for the CartProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CartProvider {

  constructor(public http: HttpClient, private api: ApiProvider) {
    console.log('Hello CartProvider Provider');
  }

  addToCart(item) {
    return this.api.post('/addToCart', item)
  }

  cartGoods() {
    return this.api.get('/cartGoods')
  }

  deleteGoods(item) {
    return this.api.post('/deleteGoods', item)
  }

}
