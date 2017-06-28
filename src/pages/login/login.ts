import { HomePage } from './../home/home';
import { LoginService } from '../../services/login.service';

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private loginService: LoginService) {
  }


  onLogin(){
    console.log(this.username);
    console.log(this.password);
    let loginStatus = this.loginService.initLogin(this.username, this.password);
    if(loginStatus.success == true){
      this.navCtrl.push(HomePage);
    }
  }

}
