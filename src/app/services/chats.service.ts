import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

const api = 'http://playmaker.gq:8080/social/chats';

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
    return this.http.post(api, chatName);
  }
}
