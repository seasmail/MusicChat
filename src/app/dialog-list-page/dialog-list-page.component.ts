import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ChatService} from '../services/chats.service';
import {Chat} from '../models/chat';

@Component({
  selector: 'app-dialog-list-page',
  templateUrl: './dialog-list-page.component.html',
  styleUrls: ['./dialog-list-page.component.scss']
})
export class DialogListPageComponent implements OnInit {
  public chats: Chat[];
  public selectedChat: Chat;
  @Output () chat = new EventEmitter<Chat>();


  constructor(
    private chatService: ChatService) { }

  ngOnInit() {
    this.getChats();
  }
  getChats(): void {
    this.chatService.getCurrentChats()
      .subscribe(res => {
        this.chats = res['data'];
      });
  }

  onSelect(chat: Chat) {
    this.chatService.changeChat(chat);
    console.log(chat + ' ' + JSON.stringify(chat));
    this.chat.emit(chat);
  }

}
