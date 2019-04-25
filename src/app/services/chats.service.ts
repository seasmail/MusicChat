import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {Chat} from '../models/chat';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../models/user';

const api = 'http://playmaker.gq:8080/social/chats';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'}),
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private selectedChat: BehaviorSubject<Chat>;
  public currentChat: Observable<Chat>;
  private chats: BehaviorSubject<Chat[]>;
  public currentChats: Observable<Chat[]>;

  constructor(private http: HttpClient,
              private router: Router) {
    this.selectedChat = new BehaviorSubject<Chat>(new Chat());
    this.currentChat = this.selectedChat.asObservable();
    this.chats = new BehaviorSubject<Chat[]>(this.getCurrentChats()['data']);
    this.currentChats = this.chats.asObservable();

  }

  public getCurrentChats(): Observable<Chat[]> {
    return this.http.get<Chat[]>(api);
  }

  public changeChat(chat: Chat) {
    this.selectedChat.next(chat);
  }

  public createChat(chatName: string) {
    return this.http.post<Chat>(api, {'chatName': chatName}, httpOptions).toPromise();
  }

  public getParticipants(chatId: number) {
    return this.http.get<User[]>(api + '/' + chatId + '/participants', httpOptions);
  }
}
