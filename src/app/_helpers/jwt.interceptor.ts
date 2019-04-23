import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthService} from '../services/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    // const currentUser = this.authService.currentUserSubject;
    if (localStorage.getItem('token') != null) {
      request = request.clone({
        setHeaders: {
          Authorization: localStorage.getItem('token')
        }
      });
    }

    return next.handle(request);
  }
}
