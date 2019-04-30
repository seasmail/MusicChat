import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from '../pages/main/main.component';
import {PlaylistComponent} from '../playlist/playlist.component';
import {AuthComponent} from '../pages/auth/auth.component';
import {LoginFormComponent} from './login-form/login-form.component';
import {SignupFormComponent} from './signup-form/signup-form.component';

const routes: Routes = [
  { path: '', component: AuthComponent,
  children: [
    { path: '', redirectTo: 'login', pathMatch: 'full'},
    { path: 'login', component: LoginFormComponent},
    { path: 'signup', component: SignupFormComponent},
  ]}
];

@NgModule({
  imports: [ RouterModule.forChild(routes)],
  exports: [ RouterModule ]
})
export class AuthRoutingModule { }
