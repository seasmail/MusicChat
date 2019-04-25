import { Component, OnInit } from '@angular/core';
import {NewChatDialogComponent} from '../new-chat-dialog/new-chat-dialog.component';
import {MatDialog} from '@angular/material';
import {ChatService} from '../services/chats.service';
import {Chat} from '../models/chat';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  public chatName: string;
  public chats: Chat[];

  constructor(
    public dialog: MatDialog,
    private chatService: ChatService) { }

  ngOnInit() {
    console.log('on init toolbar');
    this.getChats();
  }

  getChats(): void {
    this.chatService.getCurrentChats()
      .subscribe(res => {
        this.chats = res['data'];
        for (let i = 0; i < this.chats.length; i++) {
          this.chatService.getParticipants(this.chats[i].chatId)
            .subscribe(users => {
              this.chats[i].participants = users['data'];
            });
        }
      });
  }

  createChat(): void {
    const dialogRef = this.dialog.open(NewChatDialogComponent, {
      width: '400px',
      data: {name: this.chatName}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.chatService.createChat(result).then(res => this.getChats());
      this.chatName = result;
    });
  }
}
