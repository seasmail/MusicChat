import {Component, Input, OnInit} from '@angular/core';
import {Chat} from '../models/chat';
import {ChatService} from '../services/chats.service';

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
    private chatService: ChatService
  ) {
    this.chatService.getCurrentChats()
      .subscribe(res => this.currentChat = res['data'][0]);
  }

  ngOnInit() {
    this.chatService.currentChat.subscribe(chat => this.currentChat = chat);
  }

  openPlaylist() {
    this.isOpen = !this.isOpen;
  }
}
