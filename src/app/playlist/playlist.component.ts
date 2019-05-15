import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {Track} from '../models/track';
import {MusicService} from '../services/music.service';
import {Chat} from '../models/chat';
import {ChatService} from '../services/chats.service';
import YandexAudio from 'YandexAudio/src';

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
  @Input() player: any;

  chatTracks: Track[];
  trackIndex = 0;
  currentTrack: Track;

  chat: Chat;

  state: any;

  constructor(
    private musicService: MusicService,
    private chatService: ChatService
  ) {  }

  ngOnInit() {
    if (this.type === 'exactChat') {
      this.chat = this.selectedChat;
    } else {
      this.chatService.currentChat
        .subscribe(chat => {
          this.chat = chat;
          console.log('current chat for playlist ' + JSON.stringify(this.chat.trackListId));
        });
    }
  }


  onSelect(track: Track) {
    console.log(JSON.stringify(this.chat));
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
  onPlay(track: Track) {
    this.musicService.changeTrack(track);
    this.musicService.currentTrack.subscribe(res => this.currentTrack = res);
    console.log('current track ' + JSON.stringify(this.currentTrack));
    this.state = this.player.getState();
    switch (this.state) {
      case YandexAudio.STATE_PLAYING:
        this.player.pause();
        break;
      case YandexAudio.STATE_PAUSED:
        this.player.resume();
        break;
      default:
        this.player.play(track.url);
        break;
    }

    this.player.on(YandexAudio.EVENT_ENDED, res => {
      this.trackIndex++;
      if (this.trackIndex < this.chatTracks.length) {
        this.startPlay();
      }
    });
  }

  getTrackList(chat: Chat) {
    this.musicService.getTrackList(chat).subscribe(result => {
      this.chatTracks = result['data'];
      // this.musicService.changeTrack(this.chatTracks[0]);
      // this.musicService.currentTrack.subscribe(track => this.currentTrack = track);
    });
  }

  startPlay() {
    console.log('start play');
    const track = this.chatTracks[this.trackIndex];
    this.musicService.changeTrack(track);
    if (this.player.isPreloaded(track)) {
      this.player.playPreloaded(track);
    } else {
      this.player.play(track);
    }
  }

}
