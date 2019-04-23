import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginFormComponent} from './login-form/login-form.component';
import {AuthRoutingModule} from './auth-routing.module';
import {AuthComponent} from '../pages/auth/auth.component';
import {AppModule} from '../app.module';
import { SignupFormComponent } from './signup-form/signup-form.component';
import {MatIconModule, MatInputModule} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthService} from '../services/auth.service';
import {UserService} from '../services/user.service';
import {JwtInterceptor} from '../_helpers/jwt.interceptor';

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
    UserService,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}

  ]
})
export class AuthModule { }
