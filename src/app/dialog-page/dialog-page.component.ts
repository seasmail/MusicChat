import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Chat} from '../models/chat';
import {ChatService} from '../services/chats.service';
import {MatDialog} from '@angular/material';
import {AddParticipantDialogComponent} from '../dialogs/add-participant-dialog/add-participant-dialog.component';
import {RxStompService} from '@stomp/ng2-stompjs';
import {Subscription} from 'rxjs';
import {NewChatDialogComponent} from '../dialogs/new-chat-dialog/new-chat-dialog.component';
import {ChooseTrackDialogComponent} from '../dialogs/choose-track-dialog/choose-track-dialog.component';
import {MusicService} from '../services/music.service';
import {Track} from '../models/track';

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
  }

  public getCurrentChat() {
    this.chatService.currentChat.subscribe(chat => {
      if (this.currentChat) {
        this.musicService.getTrackList(this.currentChat)
          .subscribe(res => {
            this.tracks = res['data'];
            console.log(res['data']);
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
      data: {name: null}
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
