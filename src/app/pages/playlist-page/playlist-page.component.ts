import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {NewChatDialogComponent} from '../../dialogs/new-chat-dialog/new-chat-dialog.component';
import {AudioDialogComponent} from '../../dialogs/audio-dialog/audio-dialog.component';
import {MatDialog} from '@angular/material';
import {ChatService} from '../../services/chats.service';
import {Chat} from '../../models/chat';

@Component({
  selector: 'app-playlist-page',
  templateUrl: './playlist-page.component.html',
  styleUrls: ['./playlist-page.component.scss']
})
export class PlaylistPageComponent implements OnInit {

  currentSong: string;
  chats: Chat[];

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private chatService: ChatService
  ) { }

  ngOnInit() {
    this.chatService.getCurrentChats()
      .subscribe(chats => this.chats = chats['data']);
  }

  back() {
    this.router.navigateByUrl('/chat');
  }

  openAudio(chat: Chat): void {
    const dialogRef = this.dialog.open(AudioDialogComponent, {
      width: '400px',
      data: {name: null, chat: chat}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.currentSong = result;
    });
  }

}
