import {Component, Input, OnInit, Output} from '@angular/core';
import {Chat} from '../../models/chat';
import {User} from '../../models/user';
import {ChatService} from '../../services/chats.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  // styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public chats: Chat[];
  public chat: Chat = {id: 1, name: 'The first chat', participants: [], owner: null};

  constructor(
    private chatService: ChatService
  ) { }

  ngOnInit() {
    this.chatService.getCurrentChats().then();
  }

}
