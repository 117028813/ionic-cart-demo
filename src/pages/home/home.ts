import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';

import { GoodsProvider } from '../../providers/goods/goods';

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

  goodsList

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private goods: GoodsProvider
  ) {
  }

  ionViewDidLoad() {
    let loading = this.loadingCtrl.create({
      content: '数据请求中...'
    })
    loading.present()
    this.goods.getGoods().subscribe(data => {
      loading.dismiss()
      this.goodsList = data
    }, err => {
      loading.dismiss()
      this.toastCtrl.create({
        message: '数据请求失败',
        duration: 1000
      }).present()
    })
  }

  openGoodsDetail(item) {
    this.navCtrl.push('GoodsDetailPage', {
      item: item
    })
  }

}
