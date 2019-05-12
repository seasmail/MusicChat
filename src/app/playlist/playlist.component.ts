import {Component, Input, OnInit} from '@angular/core';
import {Track} from '../models/track';
import {MusicService} from '../services/music.service';
import {Chat} from '../models/chat';
import {ChatService} from '../services/chats.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {

  @Input() width: number;
  @Input() tracks: Track[];
  @Input() type: string;

  chat: Chat;

  constructor(
    private musicService: MusicService,
    private chatService: ChatService
  ) { }

  ngOnInit() {
    this.chatService.currentChat
      .subscribe(chat => {
        this.chat = chat;
        console.log(this.chat);
      });
  }

  onSelect(track: Track) {
    console.log('on select ' + this.type);
    if (this.type === 'choose') {
      console.log('choooose');
      this.musicService.addTrack(track, this.chat)
        .subscribe(res => console.log(res));
    }
  }


}
