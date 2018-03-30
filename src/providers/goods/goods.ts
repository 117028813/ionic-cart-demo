import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiProvider } from '../api/api';

/*
  Generated class for the GoodsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GoodsProvider {

  constructor(public http: HttpClient, private api: ApiProvider) {
  }

  getGoods() {
    return this.api.get('/goods')
  }

  getGoodsPaging(page) {
    return this.api.post('/goods', {page: page})
  }

  concatGoods(oldGoods, newGoods) {
    return [...oldGoods, ...newGoods]
  }

}
