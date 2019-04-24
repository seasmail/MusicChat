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
  isOpen = false;

  constructor(
    private chatService: ChatService
  ) { }

  ngOnInit() {
  }

  openPlaylist() {
    this.isOpen = !this.isOpen;
  }
}
