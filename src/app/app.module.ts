import { SingleMemberPage } from './../pages/single-member/single-member';
import { SingleGroupPage } from './../pages/single-group/single-group';
import { ErrorHandler, NgModule } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { CloudModule, CloudSettings } from '@ionic/cloud-angular';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { NamiService } from '../services/nami.service';
import { HomePage } from '../pages/home/home';
import { IonicStorageModule } from '@ionic/storage';


const cloudSettings: CloudSettings = {
  'core': {
    'app_id': 'APP_ID'
  }
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SingleGroupPage,
    SingleMemberPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings),
    IonicStorageModule.forRoot(),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SingleGroupPage,
    SingleMemberPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    NamiService,
  ]
})
export class AppModule {}
