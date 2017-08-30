import { NamiGroup } from './../../models/group.model';
import { SingleMemberPage } from './../../pages/single-member/single-member';
import { NavController } from 'ionic-angular';
import { NamiMember } from './../../models/member.model';
import { Component, Input } from '@angular/core';

/**
 * Generated class for the SingleGroupDashboardComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'single-group-dashboard',
  templateUrl: 'single-group-dashboard.html'
})
export class SingleGroupDashboardComponent {

  @Input('group') group : NamiGroup;
  members : NamiMember[] = [];
  searchTerm : string = '';


  constructor(
    private navCtrl: NavController
  ) {
    //this.resetMembers();
  }

  ngOnInit() {
    console.log('ngOnInit()');
    this.resetMembers();
  }

  resetMembers(){
    this.members = this.group.members.slice();
  }

  selectMember(member){
    this.navCtrl.push(SingleMemberPage, {member: member})
  }


  searchMembers() {
    // Reset items back to all of the items
    this.resetMembers();

    // set val to the value of the searchbar
    let val = this.searchTerm;

    // if t he value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.members = this.members.filter((item) => {
        return (
          item.firstName.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
          item.lastName.toLowerCase().indexOf(val.toLowerCase()) > -1
          );
      })
    }
  }

}
