import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {PlaylistPageComponent} from './playlist-page/playlist-page.component';
import {MainComponent} from './pages/main/main.component';
import {AuthComponent} from './pages/auth/auth.component';
import {AuthModule} from './auth/auth.module';
import {AuthGuard} from './_helpers/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full'},
  { path: 'chat', component: MainComponent, canActivate: [AuthGuard]  },
  { path: 'playlist', component: PlaylistPageComponent},
  { path: 'auth', loadChildren: './auth/auth.module#AuthModule'},

  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, {enableTracing: true}) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
