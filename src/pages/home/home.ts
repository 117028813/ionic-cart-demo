import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, ModalController } from 'ionic-angular';

import { GoodsProvider } from '../../providers/goods/goods';
import { UserProvider } from '../../providers/user/user';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  goodsList = []
  page = 1
  noMoreData = false
  get username() {
    if (this.userService.isLogin) {
      return 'admin'
    } else {
      return 'Login'
    }
  }

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private goods: GoodsProvider,
    private userService: UserProvider
  ) {
  }

  ionViewDidLoad() {
    let loading = this.loadingCtrl.create({
      content: '数据请求中...'
    })
    loading.present()
    this.goods.getGoodsPaging(this.page).subscribe(data => {
      loading.dismiss()
      this.goodsList = this.goods.concatGoods(this.goodsList, data)
    }, err => {
      loading.dismiss()
      this.toastCtrl.create({
        message: '数据请求失败',
        duration: 1000
      }).present()
    })
  }

  onInfinite(event) {
    this.goods.getGoodsPaging(++this.page).subscribe(data => {
      if (data['length'] === 0) {
        event.enable(false)
        this.noMoreData = true
      }
      event.complete()
      this.goodsList = this.goods.concatGoods(this.goodsList, data)
    })
  }

  openGoodsDetail(item) {
    this.navCtrl.push('GoodsDetailPage', {
      item: item
    })
  }

  login() {
    this.modalCtrl.create('LoginPage').present()
  }

}
