import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['../auth-styles.scss']
})
export class SignupFormComponent implements OnInit {

  hide = true;
  isLogin = true;


  signupForm = new FormGroup( {
    username: new FormControl(''),
    password: new FormControl(''),
    confPassword: new FormControl(''),
  });

  constructor() { }

  ngOnInit() {
  }

}
