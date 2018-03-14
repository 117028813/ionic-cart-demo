import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {
    name: '',
    password: ''
  }

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private viewCtrl: ViewController,
    private toastCtrl: ToastController,
    private barcodeScanner: BarcodeScanner,
    private userService: UserProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  cancle() {
    this.navCtrl.setRoot('TabsPage')
  }

  onSubmit() {
    this.login(this.user)
  }

  scan() {
    this.barcodeScanner.scan().then(barcodeData => {
      const {text} = barcodeData
      this.user.name = /\w+(?=&)/.exec(text)[0]
      this.user.password = /\w+$/.exec(text)[0]
      this.login(this.user)
    }, err => {
      alert(err)
    })
  }

  login(user) {
    this.userService.login(user).subscribe(data => {
      this.user.name = ''
      this.user.password = ''
      if (data['result'] === 1) {
        this.userService.isLogin = true
        this.viewCtrl.dismiss()
      } else {
        this.toastCtrl.create({
          message: data['message'],
          duration: 1000
        }).present()
      }
    }, err => {
      this.toastCtrl.create({
        message: '登录失败',
        duration: 1000
      }).present()
    })
  }

}
