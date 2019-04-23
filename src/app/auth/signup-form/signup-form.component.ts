import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['../auth-styles.scss']
})
export class SignupFormComponent implements OnInit {

  signupForm = new FormGroup( {
    username: new FormControl(''),
    password: new FormControl(''),
    confPassword: new FormControl(''),
  });

  constructor(private authService: AuthService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  }

  async onSubmit() {
    if (this.signupForm.invalid) {
      return;
    }
    console.log(this.signupForm.value);
    this.authService.signup(this.signupForm.controls['username'].value, this.signupForm.controls['password'].value)
      .subscribe((data) => {
          console.log(data);
          this.router.navigateByUrl('/auth/login');
        }
      );
  }

}
