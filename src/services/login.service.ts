import { Observable } from 'rxjs/Observable';

import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class LoginService {

    private user: string;
    private password: string;

    constructor(
        private http: Http,
        private storage: Storage
    ) {}


    loginToServer(){

        var headers = new Headers();;
        //headers.append("Authorization", "Basic " + btoa(this.user + ":" + this.password));
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        //headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Origin', '*');

        headers.append("Authorization", "Basic " + btoa(this.user + ":" + this.password)); 
        console.log(headers);
        return this.http.get('http://julian-weiland.de/nami-app-connector/authentication.php', {
            headers: headers
        }).map(res => res.json() )
            .toPromise();

    }


    initLogin( username, password ){
        this.user = username;
        this.password = password;
        console.log( this.loginToServer() );


    }


}
