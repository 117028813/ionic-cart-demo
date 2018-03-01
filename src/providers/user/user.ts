import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiProvider } from '../api/api';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  isLogin = false

  constructor(public http: HttpClient, private api: ApiProvider) {
  }

  login(user) {
    return this.http.post(this.api.url + '/login', user)
  }

}
