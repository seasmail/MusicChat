import {Component, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from './services/auth.service';
import {User} from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  // encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  currentUser: User;
  constructor(
    private router: Router,
    private authService: AuthService
  ) {

  }
}
