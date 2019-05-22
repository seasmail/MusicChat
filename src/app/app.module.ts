import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatButtonModule, MatCheckboxModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatSidenavModule} from '@angular/material';

import { AppComponent } from './app.component';
import { ToolbarComponent } from './pages/elements/toolbar/toolbar.component';
import { DialogListPageComponent } from './pages/elements/dialog-list-page/dialog-list-page.component';
import {MatIconModule} from '@angular/material/icon';
import { DialogCardComponent } from './pages/elements/dialog-card/dialog-card.component';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import { SidenavComponent } from './pages/elements/sidenav/sidenav.component';
import {DialogPageComponent} from './pages/elements/dialog-page/dialog-page.component';
import { PlaylistComponent } from './pages/elements/playlist/playlist.component';
import {MatMenuModule} from '@angular/material';
import { MainComponent } from './pages/main/main.component';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthService} from './services/auth.service';
import {ChatService} from './services/chats.service';
import {UserService} from './services/user.service';
import {JwtInterceptor} from './_helpers/jwt.interceptor';
import { NewChatDialogComponent } from './pages/elements/dialogs/new-chat-dialog/new-chat-dialog.component';
import { AddParticipantDialogComponent } from './pages/elements/dialogs/add-participant-dialog/add-participant-dialog.component';
import { PlaylistPageComponent } from './pages/playlist-page/playlist-page.component';
import { PlaylistCardComponent } from './pages/elements/playlist-card/playlist-card.component';
import { AudioDialogComponent } from './pages/elements/dialogs/audio-dialog/audio-dialog.component';
import {InjectableRxStompConfig, RxStompService, rxStompServiceFactory} from '@stomp/ng2-stompjs';
import {rxStompConfig} from './_helpers/rx-stomp.config';
import {NgxAutoScrollModule} from 'ngx-auto-scroll';
import { EmptyDialodComponent } from './pages/elements/empty-dialod/empty-dialod.component';
import { ChooseTrackDialogComponent } from './pages/elements/dialogs/choose-track-dialog/choose-track-dialog.component';

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
    EmptyDialodComponent,
    ChooseTrackDialogComponent,
  ],
  entryComponents: [
    NewChatDialogComponent,
    AddParticipantDialogComponent,
    AudioDialogComponent,
    ChooseTrackDialogComponent
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
    MatDialogModule,
    NgxAutoScrollModule
  ],
  providers: [
    AuthService,
    ChatService,
    UserService,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {
      provide: InjectableRxStompConfig,
      useValue: rxStompConfig
    },
    {
      provide: RxStompService,
      useFactory: rxStompServiceFactory,
      deps: [InjectableRxStompConfig]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
