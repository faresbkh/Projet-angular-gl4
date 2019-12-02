import {Component} from '@angular/core';
import {AuthenticationService} from './shared/services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public auth: AuthenticationService) {

  }

  title = 'front-end-angular';
}
