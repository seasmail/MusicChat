import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  username: string;
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.username = localStorage.getItem('username');
  }

  public logout() {
    this.authService.logout();
  }

}
