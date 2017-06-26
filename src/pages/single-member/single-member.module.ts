import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SingleMemberPage } from './single-member';

@NgModule({
  declarations: [
    SingleMemberPage,
  ],
  imports: [
    IonicPageModule.forChild(SingleMemberPage),
  ],
  exports: [
    SingleMemberPage
  ]
})
export class SingleMemberPageModule {}
