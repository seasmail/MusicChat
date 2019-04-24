import { Component, OnInit } from '@angular/core';
import {NewChatDialogComponent} from '../new-chat-dialog/new-chat-dialog.component';
import {MatDialog} from '@angular/material';
import {ChatService} from '../services/chats.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  public chatName: string;

  constructor(
    public dialog: MatDialog,
    private chatService: ChatService) { }

  ngOnInit() {
  }

  createChat(): void {
    const dialogRef = this.dialog.open(NewChatDialogComponent, {
      width: '400px',
      data: {name: this.chatName}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.chatService.createChat(result);
      this.chatName = result;
    });
  }
}
