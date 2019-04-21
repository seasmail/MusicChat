import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginFormComponent} from './login-form/login-form.component';
import {AuthRoutingModule} from './auth-routing.module';
import {AuthComponent} from '../pages/auth/auth.component';
import {AppModule} from '../app.module';
import { SignupFormComponent } from './signup-form/signup-form.component';
import {MatIconModule, MatInputModule} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AuthService} from '../services/auth.service';

@NgModule({
  declarations: [
    LoginFormComponent,
    SignupFormComponent,
    AuthComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
  ]
})
export class AuthModule { }
