import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
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

  private track: BehaviorSubject<Track>;
  public currentTrack: Observable<Track>;
  constructor(private http: HttpClient,
              private chatService: ChatService) {
    this.track = new BehaviorSubject<Track>(new Track());
    this.currentTrack = this.track.asObservable();
  }

  public changeTrack(track: Track) {
    this.track.next(track);
  }

  public findTrack(search_name: string, page: number): Observable<Track[]> {
    const params = new HttpParams().set('search_name', search_name).set('page', page.toString());
    return this.http.get<Track[]>(`${api}/track`, {headers: httpHeader, params: params});
  }

  public addTrack(track: Track, chat: Chat) {
    // let params;
    /*Object.keys(track).forEach(function (item) {
      params = params.set(item, track[item]);
    });*/
    console.log('trackId', chat.trackListId);
    console.log('chat', chat);
    const params = new HttpParams().set('track_list_id', chat.trackListId);
    const body = (JSON.stringify(track));
    return this.http.post(`${api}/track_list/track`, track,
      {headers: httpHeader, params: params});
  }

  public deleteTrack(track: Track, chat: Chat) {
    const params = new HttpParams().set('track_list_id', chat.trackListId).set('track_id', track.trackId.toString());
    return this.http.request('delete', `${api}/track_list/track`,
      {headers: httpHeader, params: params});
  }

  public getTrackList(chat: Chat): Observable<Track[]> {
    const params = new HttpParams().set('track_list_id', chat.trackListId);
    console.log('get track list chat id ' + chat.trackListId);
    return this.http.get<Track[]>(`${api}/track_list/track`, {headers: httpHeader, params: params});
  }
}
