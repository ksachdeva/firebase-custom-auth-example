import { Component } from '@angular/core';
import {LoginComponent} from './login.component';

@Component({
  selector: 'app-container',
  directives: [LoginComponent],
  template: '<custom-login></custom-login>'
})
export class AppComponent {

}
