import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatButtonModule, MatCheckboxModule, MatSidenavModule} from '@angular/material';

import { AppComponent } from './app.component';
import { ToolbarComponent } from './main-page/toolbar.component';
import { DialogListPageComponent } from './dialog-list-page/dialog-list-page.component';
import {MatIconModule} from '@angular/material/icon';
import { DialogCardComponent } from './dialog-card/dialog-card.component';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import { SidenavComponent } from './sidenav/sidenav.component';
import {DialogPageComponent} from './dialog-page/dialog-page.component';
import { PlaylistPageComponent } from './playlist-page/playlist-page.component';
import {MatMenuModule} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    DialogListPageComponent,
    DialogCardComponent,
    SidenavComponent,
    DialogPageComponent,
    PlaylistPageComponent
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    NoopAnimationsModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
