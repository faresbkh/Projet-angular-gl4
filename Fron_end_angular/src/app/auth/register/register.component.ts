import {Component} from '@angular/core';

import {Router} from '@angular/router';
import {TokenPayload, AuthenticationService} from 'src/app/shared/services/authentication.service';

@Component({
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  credentials: TokenPayload = {
    email: '',
    firstName: '',
    password: '',
  };

  constructor(private auth: AuthenticationService, private router: Router) {
  }

  register() {
    this.auth.register(this.credentials).subscribe(() => {
      this.router.navigateByUrl('/profile');
    }, (err) => {
      console.error(err);
    });
  }
}
