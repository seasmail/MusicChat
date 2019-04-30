import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Chat} from '../models/chat';
import {ChatService} from '../services/chats.service';
import {MatDialog} from '@angular/material';
import {AddParticipantDialogComponent} from '../add-participant-dialog/add-participant-dialog.component';
import {RxStompService} from '@stomp/ng2-stompjs';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-dialog-page',
  templateUrl: './dialog-page.component.html',
  styleUrls: ['./dialog-page.component.scss']
})
export class DialogPageComponent implements OnInit {

  @Input() chat: Chat;
  // chat: Chat;
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
      this.currentSubscription = this.rxStompService.watch(`/topic/${this.currentChat.chatId}`)
        .subscribe((message) => {
          this.currentChat.messages.push(JSON.parse(message.body));
          console.log(message.body);
        });
      this.chatService.getParticipants(this.currentChat.chatId);
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

  sendMessage() {
    this.rxStompService.publish({destination: `/app/chat/${this.currentChat.chatId}/sendMessage`, body: this.messageText});
    this.messageText = '';
  }

  openPlaylist() {
    this.isOpen = !this.isOpen;
  }
}
