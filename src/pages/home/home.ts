import { SingleGroupPage } from './../single-group/single-group';
import { NamiGroup } from './../../models/group.model';
import { NamiService } from './../../services/nami.service';
import { Component, OnInit} from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  groups: NamiGroup[] = [];

  constructor(
    public navCtrl: NavController,
    public namiService: NamiService
  ) {

  }

  ngOnInit(){
    this.namiService.getData()
      .then(
        (groups: NamiGroup[]) => this.groups = groups
      );
  }

  onLoadItems(refresher){
    this.namiService.loadFromServer()
      .then(
        (groups) => {
          this.groups = this.namiService.groups.slice();
          refresher.complete();
        }
      );
  }

  onDeleteItems(){
    this.namiService.deleteData();
    this.groups = this.namiService.groups.slice();
  }

  selectGroup(group){
    this.navCtrl.push(SingleGroupPage, {group: group})
  }

}
