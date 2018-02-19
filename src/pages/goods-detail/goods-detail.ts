import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { CartProvider } from '../../providers/cart/cart';

/**
 * Generated class for the GoodsDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-goods-detail',
  templateUrl: 'goods-detail.html',
})
export class GoodsDetailPage {

  item = this.navParams.get('item')
  count = 1
  isDisabled = false

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private toastCtrl: ToastController,
    private cart: CartProvider
  ) {
  }

  ionViewDidLoad() {
    
  }

  minusOne() {
    this.count--
    if (this.count < 1) {
      this.count = 1
    }
  }

  addOne() {
    this.count++
    if (this.count > 999) {
      this.count = 999
    }
  }

  addToCart() {
    this.isDisabled = true
    this.item.count = this.count
    this.item.isChecked = true
    this.cart.addToCart(this.item).subscribe(data => {
      this.toastCtrl.create({
        message: data['message'],
        duration: 1000
      }).present()
      this.isDisabled = false
      this.navCtrl.pop()
    }, err => {
      this.toastCtrl.create({
        message: '添加到购物车失败',
        duration: 1000
      }).present()
      this.isDisabled = false
    })
  }

}
