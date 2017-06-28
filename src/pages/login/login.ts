import { HomePage } from './../home/home';
import { LoginService } from '../../services/login.service';

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio';


/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public username: string;
  public password: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private loginService: LoginService,private faio: FingerprintAIO) {
  }

  ionViewDidEnter(){
    this.checkForFingerprint()
  }

  checkForFingerprint(){
    let credentials = this.loginService.oldLoginCredentials;
    if(credentials != null && this.faio.isAvailable()){

      this.faio.show({
          clientId: 'Fingerprint-Demo',
          clientSecret: 'password', //Only necessary for Android
          disableBackup:true  //Only for Android(optional)
      })
      .then((result: any) => {
        this.loadHomePage();
      })
      .catch((error: any) => console.log(error));

    }
  }

  onLogin(){
    console.log(this.username);
    console.log(this.password);
    let loginStatus = this.loginService.initLogin(this.username, this.password);
    if(loginStatus.success == true){
      this.loadHomePage();
    }
  }

  loadHomePage(){
    this.navCtrl.push(HomePage);
  }

}
