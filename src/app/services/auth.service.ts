import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';

import {UserService} from './user.service';
import {Router} from '@angular/router';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'}),
  observe: 'response' as 'body'
};

const api = 'http://playmaker.gq:8080/auth/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public currentUser: Observable<string>;
  public currentUserSubject: BehaviorSubject<string>;


  constructor(
    private http: HttpClient,
    private userService: UserService,
    private router: Router) {
    this.currentUserSubject = new BehaviorSubject<string>(localStorage.getItem('token'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): string {
    return this.currentUserSubject.value;
  }

  public login(username: string, password: string) {
    return this.http.post<any>(api + 'login', {username, password}, httpOptions).toPromise();
  }

  public isLogged() {
    return localStorage.getItem('token') != null;
  }

  public logout() {
    this.currentUserSubject.next(null);
    localStorage.clear();
    this.router.navigateByUrl('/auth');
  }

  public signup(username: string, password: string) {
    return this.http.post(api + 'signup', {username, password}, {responseType: 'text'});
  }
}
