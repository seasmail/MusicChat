import {Component, Input, OnInit, Output} from '@angular/core';
import {Chat} from '../../models/chat';
import {User} from '../../models/user';
import {ChatService} from '../../services/chats.service';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  // styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  // public chat: Chat = {chatId: 1, chatName: 'The first chat', owner: null};

  constructor(
    private chatService: ChatService,
    private userService: UserService
  ) {
  }

  ngOnInit() {
    this.chatService.getCurrentChats();
  }

}
