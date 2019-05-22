import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['../auth-styles.scss'],
})
export class LoginFormComponent implements OnInit {

  public isError = false;
  public status: number;
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
    let decoded: string;
    this.authService.login(this.loginForm.controls['username'].value, this.loginForm.controls['password'].value).then((data: Response) => {
      decoded = jwt_decode(data.headers.get('Authorization'));
      this.userService.setSession(data, decoded['sub']);
      this.router.navigate(['/chat']).then(res => window.location.reload());
    }).catch(error1 => {
      console.log('error here ' + error1['status']);
      this.isError = true;
      this.status = error1['status'];
    });
  }

}
