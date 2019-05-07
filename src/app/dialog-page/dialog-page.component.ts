import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Chat} from '../models/chat';
import {ChatService} from '../services/chats.service';
import {MatDialog} from '@angular/material';
import {AddParticipantDialogComponent} from '../dialogs/add-participant-dialog/add-participant-dialog.component';
import {RxStompService} from '@stomp/ng2-stompjs';
import {Subscription} from 'rxjs';
import {NewChatDialogComponent} from '../dialogs/new-chat-dialog/new-chat-dialog.component';
import {ChooseTrackDialogComponent} from '../dialogs/choose-track-dialog/choose-track-dialog.component';

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

  constructor(
    public dialog: MatDialog,
    private chatService: ChatService,
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
      if (this.currentSubscription) {
        this.currentSubscription.unsubscribe();
      }
      this.currentChat = chat;
      if (!chat) {
        this.chatService.getParticipants(this.currentChat.chatId);
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
      data: {chatId: this.currentChat.chatId, username: null}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.chatService.addParticipant(result['chatId'], result['username'])
        .subscribe(res => this.chatService.getParticipants(result['chatId']));
      this.currentChat.participants.push(result['username']);
    });
  }

  removePerson() {

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
      console.log('The dialog was closed');
      // this.chatService.createChat(result['name'])
      //   .then(data => {
      //     this.chatService.addParticipant(data['chatId'], result['participants']);
      //     console.log('result after closing ' + JSON.stringify(result['participants']));
      //   })
      //   .then(res => this.getChats());
      // this.chatName = result;
    });
  }
}
