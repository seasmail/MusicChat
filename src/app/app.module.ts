import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatButtonModule, MatCheckboxModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatSidenavModule} from '@angular/material';

import { AppComponent } from './app.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { DialogListPageComponent } from './dialog-list-page/dialog-list-page.component';
import {MatIconModule} from '@angular/material/icon';
import { DialogCardComponent } from './dialog-card/dialog-card.component';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import { SidenavComponent } from './sidenav/sidenav.component';
import {DialogPageComponent} from './dialog-page/dialog-page.component';
import { PlaylistComponent } from './playlist/playlist.component';
import {MatMenuModule} from '@angular/material';
import { MainComponent } from './pages/main/main.component';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthService} from './services/auth.service';
import {ChatService} from './services/chats.service';
import {UserService} from './services/user.service';
import {JwtInterceptor} from './_helpers/jwt.interceptor';
import { NewChatDialogComponent } from './new-chat-dialog/new-chat-dialog.component';
import { AddParticipantDialogComponent } from './add-participant-dialog/add-participant-dialog.component';
import { PlaylistPageComponent } from './pages/playlist-page/playlist-page.component';
import { PlaylistCardComponent } from './playlist-card/playlist-card.component';
import { AudioDialogComponent } from './audio-dialog/audio-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    DialogListPageComponent,
    DialogCardComponent,
    SidenavComponent,
    DialogPageComponent,
    PlaylistComponent,
    MainComponent,
    NewChatDialogComponent,
    AddParticipantDialogComponent,
    PlaylistPageComponent,
    PlaylistCardComponent,
    AudioDialogComponent,
  ],
  entryComponents: [
    NewChatDialogComponent,
    AddParticipantDialogComponent,
    AudioDialogComponent,
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
    HttpClientModule,
    MatDialogModule
  ],
  providers: [
    AuthService,
    ChatService,
    UserService,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
