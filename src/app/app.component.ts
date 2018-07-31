import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { views } from './app-nav-views';
import { MOBILE } from './services/constants';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.pug',
  encapsulation: ViewEncapsulation.None
})

export class AppComponent {
  mobile = MOBILE;
  views = views;

  constructor(
    @Inject('AppConfig') private $config,
  ) {

  }

  activateEvent(event) {
    if (ENV === 'development') {
      console.log('Activate Event:', event);
    }
  }

  deactivateEvent(event) {
    if (ENV === 'development') {
      console.log('Deactivate Event', event);
    }
  }

}
