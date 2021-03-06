import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {

  url = 'http://localhost:3000'
  // url = 'http://192.168.1.218:3000'

  constructor(public http: HttpClient) {
    console.log('Hello ApiProvider Provider');
  }

  get(path, options={}) {
    if (path.startsWith('http')) {
      return this.http.get(path, options)
    } else {
      return this.http.get(this.url + path, options)
    }
  }

  post(path, body, options={}) {
    if (path.startsWith('http')) {
      return this.http.post(path, body, options)
    } else {
      return this.http.post(this.url + path, body, options)
    }
  }

}
