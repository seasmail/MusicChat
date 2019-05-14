import {Component, OnChanges, OnInit, ViewChild} from '@angular/core';
import {NewChatDialogComponent} from '../dialogs/new-chat-dialog/new-chat-dialog.component';
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
        console.log(res['data']);
      },
        error => console.log('Error: ' + error),
        () => this.getLastChatsMessage()
      );
    // this.getLastChatsMessage();
  }

  public getLastChatsMessage() {
    console.log('last msg');
    for (let i = 0; i < this.chats.length; i++) {
      this.chatService.getMessages(this.chats[i].chatId)
        .subscribe(messages => {
          if (this.chats[i]) {
            this.chats[i].messages = [];
            this.chats[i].messages.push(messages['data'][0]);
          }
        });
    }
  }


  createChat(): void {
    const dialogRef = this.dialog.open(NewChatDialogComponent, {
      width: '400px',
      data: {name: this.chatName, participants: null}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.chatService.createChat(result['name'])
        .then(data => {
          this.chatService.addParticipant(data['chatId'], result['participants']);
          console.log('result after closing ' + JSON.stringify(result['participants']));
        })
        .then(res => this.getChats());
      this.chatName = result;
    });
  }
}
