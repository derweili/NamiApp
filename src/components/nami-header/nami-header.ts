import { Component } from '@angular/core';

/**
 * Generated class for the NamiHeaderComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'nami-header',
  templateUrl: 'nami-header.html'
})
export class NamiHeaderComponent {

  text: string;

  constructor() {
    console.log('Hello NamiHeaderComponent Component');
    this.text = 'Hello World';
  }

}
