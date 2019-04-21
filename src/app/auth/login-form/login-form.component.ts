import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['../auth-styles.scss'],
})
export class LoginFormComponent implements OnInit {

  hide = true;
  isLogin = true;

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.log(this.loginForm.value);
    console.warn('SUBMIT ON LOGIN FORM');
    this.authService.login('USER', 'PSW').subscribe(data => console.log(data));
  }

}
