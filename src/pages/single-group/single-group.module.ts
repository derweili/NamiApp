import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SingleGroupPage } from './single-group';

@NgModule({
  declarations: [
    SingleGroupPage,
  ],
  imports: [
    IonicPageModule.forChild(SingleGroupPage),
  ],
  exports: [
    SingleGroupPage
  ]
})
export class SingleGroupPageModule {}
