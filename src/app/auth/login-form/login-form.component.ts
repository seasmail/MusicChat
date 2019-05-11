import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['../auth-styles.scss'],
})
export class LoginFormComponent implements OnInit {

  hide = true;

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  constructor(private authService: AuthService,
              private userService: UserService,
              private router: Router) { }

  ngOnInit() {
  }

  async onSubmit() {

    if (this.loginForm.invalid) {
      return;
    }

    console.log(this.loginForm.value);
    this.authService.login(this.loginForm.controls['username'].value, this.loginForm.controls['password'].value);
    // this.router.navigateByUrl('/chat');
  }

}
