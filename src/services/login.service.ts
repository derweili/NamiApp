import { LoginCredentials } from '../models/login-credentials.model';

//import { isTrueProperty } from 'ionic-angular/util';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class LoginService {

    private username: string;
    private password: string;
    public oldLoginCredentials;

    constructor(
        private http: Http,
        private storage: Storage,
    ) {
        this.getCurrentCredentials();
    }


    loginToServer(){
        console.log('loginToServer()');
        var headers = new Headers();;
        //headers.append("Authorization", "Basic " + btoa(this.user + ":" + this.password));
        //headers.append('Content-Type', 'application/x-www-form-urlencoded');
        //headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Origin', '*');

        headers.append("Authorization", "Basic " + btoa(this.username + ":" + this.password)); 
        return this.http.get('http://nami.derweili.de/nami-app-connector/authentication.php', {
            headers: headers
        }).map((res) =>{
            console.log('loginToServerResult');
            console.log(res);
            return res.json();
        })
        .toPromise();

    }

    getCurrentCredentials(){
        console.log('getCurrentCredentials');
        this.storage.get('login_credentials').then((val) => {
            this.oldLoginCredentials = val;
        });
    }

    initLogin( username, password ){
        console.log('initLogin');
        this.username = username;
        this.password = password;
        
        return new Promise((resolve, reject) => {

            if( this.oldLoginCredentials != null && this.oldLoginCredentials.username == username && this.oldLoginCredentials.password == password ){

                resolve( {
                    success: true
                } );

            }else{
                this.loginToServer()
                .then((response) => {
                    console.log('loginToServer');
                    console.log(response);
                    resolve(
                     this.handleLoginResponse(response)
                    );
                });
            }
        })

    }

    handleLoginResponse( serverResponse ){
        console.log('handleLoginResponse');
        if( serverResponse.success === true ){
            console.log('serverResponse.success is true');
            this.storage.clear();
            this.saveNewCredentials();
            return serverResponse;
        }else{
            return serverResponse;
        }
    }

    saveNewCredentials(){
      console.log('saveNewCredentials');
      let newCredentials = new LoginCredentials(
          this.username,
          this.password
      )
      this.storage.set('login_credentials', newCredentials);
      this.oldLoginCredentials = newCredentials;
      

    }

    loadCredentials(){
        console.log('getCurrentCredentials');
        return this.storage.get('login_credentials');
    }

}
