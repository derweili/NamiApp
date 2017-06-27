import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { NamiHeaderComponent } from './nami-header';

@NgModule({
  declarations: [
    NamiHeaderComponent,
  ],
  imports: [
    IonicModule,
  ],
  exports: [
    NamiHeaderComponent
  ]
})
export class NamiHeaderComponentModule {}
