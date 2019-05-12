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
  @Input() selectedChat: Chat;

  chatTracks: Track[];

  chat: Chat;

  constructor(
    private musicService: MusicService,
    private chatService: ChatService
  ) { }

  ngOnInit() {
    if (this.type === 'exactChat') {
      this.chat = this.selectedChat;
    } else {
      this.chatService.currentChat
        .subscribe(chat => {
          this.chat = chat;
          console.log(this.chat);
        });
    }
  }

  onSelect(track: Track) {
    this.musicService.addTrack(track, this.chat)
      .subscribe(res => {
        console.log(res);
        this.musicService.getTrackList(this.chat).subscribe(result => {
          this.chatTracks = result['data'];
        });
      });
  }

  onDelete(track: Track) {
    this.musicService.deleteTrack(track, this.chat)
      .subscribe(res => {
        this.musicService.getTrackList(this.chat).subscribe(result => {
          console.log('after delete' + JSON.stringify(result));
          this.chatTracks = result['data'];
        });
      });
  }


}
