import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the GoodsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GoodsProvider {
  url = 'http://localhost:3000'

  constructor(public http: HttpClient) {
    console.log('Hello GoodsProvider Provider');
  }

  getGoods() {
    return this.http.get(this.url + '/goods')
  }

}
