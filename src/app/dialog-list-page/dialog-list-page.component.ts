import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ChatService} from '../services/chats.service';
import {Chat} from '../models/chat';

@Component({
  selector: 'app-dialog-list-page',
  templateUrl: './dialog-list-page.component.html',
  styleUrls: ['./dialog-list-page.component.scss']
})
export class DialogListPageComponent implements OnInit {
  @Input() chats: Chat[];
  public selectedChat: Chat;
  constructor(
    private chatService: ChatService) { }

  ngOnInit() {
    console.log('LIST ON INIT');
    this.chatService.currentChat.subscribe(chat => this.selectedChat = chat);
  }

  onSelect(chat: Chat) {
    this.chatService.changeChat(chat);
    this.selectedChat = chat;
    console.log('selected chat ' + this.selectedChat);
    console.log('list ' + JSON.stringify(this.chats));
  }



}
