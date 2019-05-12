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
        this.getTrackList(this.chat);
      });
  }

  onDelete(track: Track) {
    this.musicService.deleteTrack(track, this.chat)
      .subscribe(res => {
        this.getTrackList(this.chat);
      });
  }

  getTrackList(chat: Chat) {
    this.musicService.getTrackList(chat).subscribe(result => {
      this.chatTracks = result['data'];
    });
  }


}
