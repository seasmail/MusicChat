import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Track} from '../models/track';
import {ChatService} from './chats.service';
import {Chat} from '../models/chat';
import {stringify} from 'querystring';

const api = 'http://playmaker.gq:8080/music';
const httpHeader = new HttpHeaders({ 'Content-Type': 'application/json'});

@Injectable({
  providedIn: 'root'
})
export class MusicService {
  constructor(private http: HttpClient,
              private chatService: ChatService) { }

  public findTrack(search_name: string, page: number): Observable<Track[]> {
    const params = new HttpParams().set('search_name', search_name).set('page', page.toString());
    return this.http.get<Track[]>(`${api}/track`, {headers: httpHeader, params: params});
  }

  public addTrack(track: Track, chat: Chat) {
    // let params;
    /*Object.keys(track).forEach(function (item) {
      params = params.set(item, track[item]);
    });*/
    const params = new HttpParams().set('track_list_id', chat.trackListId);
    const body = (JSON.stringify(track));
    return this.http.post(`${api}/track_list/track`, {track},
      {headers: httpHeader, params: params});
  }

  public deleteTrack(track: Track, chat: Chat) {
     return this.http.request('delete', `${api}/track_list/track`,
       {body: {'track_list_id': chat.trackListId, 'track_id': track}});
  }

  public getTrackList(chat: Chat): Observable<Track[]> {
    const params = new HttpParams().set('track_list_id', chat.trackListId);
    console.log('get track list chat id ' + chat.trackListId);
    return this.http.get<Track[]>(`${api}/track_list/track`, {headers: httpHeader, params: params});
  }
}
