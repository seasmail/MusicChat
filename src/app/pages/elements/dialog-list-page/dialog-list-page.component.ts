import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ChatService} from '../../../services/chats.service';
import {Chat} from '../../../models/chat';
import {Router, RoutesRecognized} from '@angular/router';
import {Location} from '@angular/common';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/pairwise';


@Component({
  selector: 'app-dialog-list-page',
  templateUrl: './dialog-list-page.component.html',
  styleUrls: ['./dialog-list-page.component.scss']
})
export class DialogListPageComponent implements OnInit {
  @Input() chats: Chat[];
  public selectedChat: Chat;
  constructor(
    private chatService: ChatService,
    private router: Router,
    private location: Location) {
    this.router.events
      .filter(e => e instanceof RoutesRecognized)
      .pairwise()
      .subscribe((event: any[]) => {
        console.log(' after  ' + event[0].urlAfterRedirects);
      });
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
    this.getMessages();
  }

  public getParticipants() {
      this.chatService.getParticipants(this.selectedChat.chatId)
        .subscribe(users => {
          this.selectedChat.participants = users['data'];
        });
  }

  public getMessages() {
    this.chatService.getMessages(this.selectedChat.chatId)
      .subscribe(messages => {
        console.log('get messages');
        this.selectedChat.messages = messages['data'].reverse();
      });
  }



}
