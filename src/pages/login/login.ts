import { HomePage } from './../home/home';
import { LoginService } from '../../services/login.service';

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio';
import { LoadingController } from 'ionic-angular';
import { Toast } from '@ionic-native/toast';


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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private loginService: LoginService,
    private faio: FingerprintAIO,
    public loadingCtrl: LoadingController,
    private toast: Toast
    ) {
  }

  ionViewDidEnter(){
    this.checkForFingerprint();
    this.loginService.loadCredentials()
      .then((credentials)=>{
        console.log('set username');
        console.log(credentials);
        if(credentials != null ){
        this.username = credentials.username;
        }
      });
  }

  checkForFingerprint(){
    let credentials = this.loginService.loadCredentials().then((val) => {
          if(val != null && this.faio.isAvailable() ){
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
    });
    
  }

  onLogin(){
    console.log(this.username);
    console.log(this.password);
    console.log('onLogin');
    if( this.username && this.password ) {
      console.log('username and password are set')
      let loader = this.loadingCtrl.create({
        content: "Please wait..."
      });
      loader.present();

      let loginStatus = this.loginService.initLogin(this.username, this.password)
        .then((data:any) => {
          console.log('initLogin.then()');
          loader.dismiss();
          if(data.success == true){
            console.log('initLogin.then() data.success == true');
            this.loadHomePage();
          }else{
            console.log('initLogin.then() data.success != true')
            this.toast.show('Login fehlgeschlagen. Dein Nutzer wurde für 15 Minugen gesperrt.', '5000', 'center')
              .subscribe(
                toast => {
                  console.log(toast);
                });
          }
        }).catch((ex) => {
          console.error('Error fetching users', ex);
        });
      
    }
  }

  loadHomePage(){
    this.username = '';
    this.password = '';
    this.navCtrl.push(HomePage);
  }

}
