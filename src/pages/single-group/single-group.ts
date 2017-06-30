import { NamiMember } from './../../models/member.model';
import { SingleMemberPage } from './../single-member/single-member';
import { NamiGroup } from '../../models/group.model';

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SingleGroupPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-single-group',
  templateUrl: 'single-group.html',
})
export class SingleGroupPage {

  group : NamiGroup;
  members : NamiMember[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.group = this.navParams.get('group');
    //this.resetMembers();
  }


}
