import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/user';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin' : '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE' })
};

const api = 'http://playmaker.gq:8080/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) { }

  public login(name: string, password: string) {
    return this.http.post(api + 'auth/login', {name, password}, httpOptions);
  }

  public signup(name: string, password: string) {}
}
