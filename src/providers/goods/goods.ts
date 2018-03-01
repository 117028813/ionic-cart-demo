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
    return this.http.get(this.api.url + '/goods')
  }

  getGoodsPaging(page) {
    return this.http.post(this.api.url + '/goods', {page: page})
  }

  concatGoods(oldGoods, newGoods) {
    return [...oldGoods, ...newGoods]
  }

}
