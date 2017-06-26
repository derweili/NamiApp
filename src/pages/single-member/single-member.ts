import { NamiMember } from './../../models/member.model';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SingleMemberPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-single-member',
  templateUrl: 'single-member.html',
})
export class SingleMemberPage {

  member: NamiMember;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.member = this.navParams.get('member');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SingleMemberPage');
  }

}
