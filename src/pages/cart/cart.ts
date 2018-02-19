import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { CartProvider } from '../../providers/cart/cart';

/**
 * Generated class for the CartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  goods
  totalCount = 0
  totalAmount = 0
  isCheckedAll
  isEmpty = false

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private cart: CartProvider
  ) {
  }

  ionViewDidEnter() {
    let loading = this.loadingCtrl.create({
      content: '请求数据中...'
    })
    loading.present()
    this.cart.cartGoods().subscribe(data => {
      loading.dismiss()
      this.goods = data
      this.computeTotalAmount()
      this.isCheckedAll = this.goods.every((val, index, arr) => {
        return val.isChecked
      })
    }, err => {
      loading.dismiss()
      this.toastCtrl.create({
        message: '数据请求失败',
        duration: 1000
      }).present()
    })
  }

  ngDoCheck() {
    if (this.totalAmount < 0) {
      this.totalAmount = 0
    }
    if (this.goods && this.goods.length === 0) {
      this.isEmpty = true
    } else {
      this.isEmpty = false
    }
  }

  onChecked() {
    this.isCheckedAll = this.goods.every((val, index, arr) => {
      return val.isChecked
    })
    this.computeTotalAmount()
  }

  onCheckedAll() {
    this.goods.forEach((val, ind, arr) => {
      val.isChecked = this.isCheckedAll
    })
    this.computeTotalAmount()
  }

  addOne(item) {
    item.count++
    if (item.count > 999) {
      item.count = 999
      return
    }
    this.totalCount++
    this.totalAmount += item.amount
  }

  minusOne(item) {
    item.count--
    if (item.count < 1) {
      item.count = 1
      return
    }
    this.totalCount--
    this.totalAmount -= item.amount
  }

  onChangeNum(item) {
    if (!Number.isInteger(item.count) || item.count < 1) {
      item.count = 1
    }
    this.totalCount = 0
    this.totalAmount = 0
    this.computeTotalAmount()
  }

  deleteGoods(item) {
    this.goods = this.goods.filter((val, ind, arr) => {
      return val.id != item.id
    })
    this.computeTotalAmount()
    this.cart.deleteGoods(JSON.stringify(item)).subscribe(data => {
      this.goods = data
      this.toastCtrl.create({
        message: '删除成功',
        duration: 1000
      }).present()
    })
  }

  computeTotalAmount() {
    this.totalCount = 0
    this.totalAmount = 0
    this.goods.forEach((val, ind, arr) => {
      if (val.isChecked) {
        this.totalCount += +val.count
        this.totalAmount += val.amount * val.count
      }
    })
  }

}
