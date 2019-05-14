import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Chat} from '../models/chat';
import {ChatService} from '../services/chats.service';
import {MatDialog} from '@angular/material';
import {AddParticipantDialogComponent} from '../dialogs/add-participant-dialog/add-participant-dialog.component';
import {RxStompService} from '@stomp/ng2-stompjs';
import {Subscription} from 'rxjs';
import {ChooseTrackDialogComponent} from '../dialogs/choose-track-dialog/choose-track-dialog.component';
import {MusicService} from '../services/music.service';
import {Track} from '../models/track';
import YandexAudio from 'YandexAudio/src';


@Component({
  selector: 'app-dialog-page',
  templateUrl: './dialog-page.component.html',
  styleUrls: ['./dialog-page.component.scss']
})
export class DialogPageComponent implements OnInit {

  @Input() chat: Chat;

  currentChat: Chat;
  isOpen = false;
  currentSubscription: Subscription;
  messageText: string;
  currentUsername = localStorage.getItem('username');
  tracks: Track[];
  type = 'options';
  public player: any;
  playIcon: boolean;
  state: any;
  currentTrack: Track;

  constructor(
    public dialog: MatDialog,
    private chatService: ChatService,
    private musicService: MusicService,
    private rxStompService: RxStompService
  ) {
    this.chatService.getCurrentChats()
      .subscribe(res => this.currentChat = res['data'][0]);
  }

  ngOnInit() {
    this.getCurrentChat();
    this.player = new YandexAudio('html5');
    this.player.initPromise().then(function() {
      console.log('Аудиоплеер готов к работе.');
    }, function() {
      console.error('Не удалось инициализировать аудиоплеер.');
    });
    this.player.on(YandexAudio.EVENT_STATE, res => {
      this.playIcon = res !== YandexAudio.STATE_PLAYING;
    });
  }

  public getCurrentChat() {
    this.chatService.currentChat.subscribe(chat => {
      if (this.currentChat) {
        console.log(JSON.stringify(this.currentChat));
        this.musicService.getTrackList(this.currentChat)
          .subscribe(res => {
            this.tracks = res['data'];
            console.log(res['data']);
            this.musicService.changeTrack(this.tracks[0]);
            this.musicService.currentTrack.subscribe(track => this.currentTrack = track);
          });
      }
      if (this.currentSubscription) {
        this.currentSubscription.unsubscribe();
      }
      this.currentChat = chat;
      if (!chat) {
        this.chatService.getParticipants(this.currentChat.chatId);
        console.log(JSON.stringify(this.currentChat.participants));
      }
      this.currentSubscription = this.rxStompService.watch(`/topic/${this.currentChat.chatId}`)
        .subscribe((message) => {
          this.currentChat.messages.push(JSON.parse(message.body));
          console.log(message.body);
        });
    });
  }

  addPerson(): void {
    const dialogRef = this.dialog.open(AddParticipantDialogComponent, {
      width: '400px',
      data: {type: 'Add', chatId: this.currentChat.chatId, username: null}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.chatService.addParticipant(result['chatId'], result['username'])
          .subscribe(participants => this.currentChat.participants.push(result['username']));
    });
  }

  removePerson() {
    const dialogRef = this.dialog.open(AddParticipantDialogComponent, {
      width: '400px',
      data: {type: 'Remove', chatId: this.currentChat.chatId, username: null}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.chatService.removeParticipant(this.currentChat.chatId, result['username'])
        .subscribe(res => {
          this.currentChat.participants.slice(this.currentChat.participants.indexOf(result['username']), 1);
        });
    });
  }

  onPlay() {
    console.log(this.playIcon);
    this.playIcon = !this.playIcon;
    this.state = this.player.getState();
    switch (this.state) {
      case YandexAudio.STATE_PLAYING:
        this.player.pause();
        break;
      case YandexAudio.STATE_PAUSED:
        this.player.resume();
        break;
      default:
        this.player.play(this.currentTrack.url);
        break;
    }
  }

  onPrevious(previous: boolean) {
    if (previous) {
    }
  }

  leaveChat() {
    this.chatService.removeParticipant(this.currentChat.chatId, localStorage.getItem('username'))
      .subscribe(res => console.log(res));
  }

  sendMessage() {
    this.rxStompService.publish({destination: `/app/chat/${this.currentChat.chatId}/sendMessage`, body: this.messageText});
    this.messageText = '';
  }

  openPlaylist() {
    this.isOpen = !this.isOpen;
  }

  attachment(): void {
    const dialogRef = this.dialog.open(ChooseTrackDialogComponent, {
      width: '400px',
      data: {name: null, player: this.player}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.musicService.getTrackList(this.currentChat)
        .subscribe(res => {
          this.tracks = res['data'];
          console.log(res['data']);
        });
    });
  }
}
