import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {Chat} from '../models/chat';
import {Observable} from 'rxjs';

const api = 'http://playmaker.gq:8080/social/chats';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'}),
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  
  private selectedChat: Chat;

  constructor(private http: HttpClient,
              private router: Router) { }

  public getCurrentChats(): Observable<Chat[]> {
    return this.http.get<Chat[]>(api);
  }

  public getSelectedChat(): Chat {
    console.log('get ' + this.selectedChat);
    return this.selectedChat;
  }

  public setSelectedChat(chat: Chat) {
    this.selectedChat = chat;
  }

  public createChat(chatName: string) {
    console.log('on creating the chat');
    return this.http.post<Chat>(api, {'chatName': chatName}, httpOptions).toPromise().then(res => {
      console.log(res);
      this.getCurrentChats().subscribe(r => console.log(r));
    });
  }
}
