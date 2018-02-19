import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the CartProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CartProvider {

  url = 'http://localhost:3000'

  constructor(public http: HttpClient) {
    console.log('Hello CartProvider Provider');
  }

  addToCart(item) {
    return this.http.post(this.url + '/addToCart', JSON.stringify(item))
  }

  cartGoods() {
    return this.http.get(this.url + '/cartGoods')
  }

  deleteGoods(item) {
    return this.http.post(this.url + '/deleteGoods', item)
  }

}
