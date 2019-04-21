import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatSidenavModule} from '@angular/material';

import { AppComponent } from './app.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { DialogListPageComponent } from './dialog-list-page/dialog-list-page.component';
import {MatIconModule} from '@angular/material/icon';
import { DialogCardComponent } from './dialog-card/dialog-card.component';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import { SidenavComponent } from './sidenav/sidenav.component';
import {DialogPageComponent} from './dialog-page/dialog-page.component';
import { PlaylistPageComponent } from './playlist-page/playlist-page.component';
import {MatMenuModule} from '@angular/material';
import { MainComponent } from './pages/main/main.component';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app-routing.module';
import { AuthComponent } from './pages/auth/auth.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LoginFormComponent } from './auth/login-form/login-form.component';
import {AuthModule} from './auth/auth.module';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    DialogListPageComponent,
    DialogCardComponent,
    SidenavComponent,
    DialogPageComponent,
    PlaylistPageComponent,
    MainComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    NoopAnimationsModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatMenuModule,
    AppRoutingModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
