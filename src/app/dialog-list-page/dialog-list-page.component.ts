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
    private chatService: ChatService) {
  }

  ngOnInit() {
    this.chatService.currentChat.subscribe(chat => {
      console.log(chat);
      this.selectedChat = chat;
    });
  }

  onSelect(chat: Chat) {
    this.chatService.changeChat(chat);
    this.selectedChat = chat;
    this.getParticipants();
  }

  public getParticipants() {
      this.chatService.getParticipants(this.selectedChat.chatId)
        .subscribe(users => {
          this.selectedChat.participants = users['data'];
        });
  }

}
