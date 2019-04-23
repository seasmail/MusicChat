import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {User} from '../models/user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin' : '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE' })
};

const api = 'http://playmaker.gq:8080/users/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
              private router: Router) { }

  public getUserByName(username: string) {
    return this.http.get(api + username, httpOptions);
  }

  public updateUser(user: User) {
    return this.http.post(api + user.username, user, httpOptions);
  }

  public setSession(authResult): void {
    localStorage.setItem('token', authResult.headers.get('Authorization'));
  }
}
