import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {Chat} from '../models/chat';

const api = 'http://playmaker.gq:8080/social/chats';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'}),
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient,
              private router: Router) { }

  public getCurrentChats() {
    return this.http.get(api).toPromise();
  }

  public createChat(chatName: string) {
    console.log('on creating the chat');
    return this.http.post<Chat>(api, {'chatName': chatName}, httpOptions).toPromise().then(res => console.log(res));
  }
}
