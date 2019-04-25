import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import * as jwt_decode from 'jwt-decode';
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
  public decoded;

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
    return this.http.post<any>(api + 'login', {username, password}, httpOptions).subscribe((data: Response) => {
        console.log('data ' + JSON.stringify(data));
        this.decoded = jwt_decode(data.headers.get('Authorization'));
        console.log('decoded: ' + this.decoded);
        this.userService.setSession(data);
        this.router.navigate(['/chat']);
      }
    );
  }

  public isLogged() {
    return localStorage.getItem('token') != null;
  }

  public logout() {
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
    this.router.navigateByUrl('/auth/login');
  }

  public signup(username: string, password: string) {
    return this.http.post(api + 'signup', {username, password}, {responseType: 'text'});
  }
}
