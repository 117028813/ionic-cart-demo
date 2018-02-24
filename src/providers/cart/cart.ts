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
    return this.http.post(this.api.url + '/addToCart', item)
  }

  cartGoods() {
    return this.http.get(this.api.url + '/cartGoods')
  }

  deleteGoods(item) {
    return this.http.post(this.api.url + '/deleteGoods', item)
  }

}
