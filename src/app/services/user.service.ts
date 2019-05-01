import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {User} from '../models/user';
import {BehaviorSubject, Observable} from 'rxjs';
import {Chat} from '../models/chat';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin' : '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE' })
};

const api = 'http://playmaker.gq:8080/users/';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // private currentUser: BehaviorSubject<User>;
  // public user: Observable<User>;

  constructor(private http: HttpClient,
              private router: Router) {
    // this.currentUser = new BehaviorSubject<User>(new User());
    // this.user = this.currentUser.asObservable();
  }

  // public changeUser(user: User) {
  //   this.currentUser.next(user);
  //   console.log('change user ' + user.username);
  // }

  public getUserByName(username: string) {
    return this.http.get(api + username, httpOptions);
  }

  public updateUser(user: User) {
    return this.http.post(api + user.username, user, httpOptions);
  }

  public setSession(authResult, username): void {
    localStorage.setItem('token', authResult.headers.get('Authorization'));
    localStorage.setItem('username', username);

  }
}
