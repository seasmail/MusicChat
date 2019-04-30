import {Component, Input, OnInit} from '@angular/core';
import {Chat} from '../models/chat';
import {ChatService} from '../services/chats.service';
import {createForJitStub} from '@angular/compiler/src/aot/summary_serializer';
import {NewChatDialogComponent} from '../new-chat-dialog/new-chat-dialog.component';
import {MatDialog} from '@angular/material';
import {AddParticipantDialogComponent} from '../add-participant-dialog/add-participant-dialog.component';

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

  constructor(
    public dialog: MatDialog,
    private chatService: ChatService
  ) {
    this.chatService.getCurrentChats()
      .subscribe(res => this.currentChat = res['data'][0]);
  }

  ngOnInit() {
    this.getCurrentChat();
  }

  public getCurrentChat() {
    this.chatService.currentChat.subscribe(chat => {
      this.currentChat = chat;
      if (!chat) {
        this.chatService.getParticipants(this.currentChat.chatId);
      }
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

  openPlaylist() {
    this.isOpen = !this.isOpen;
  }
}
