import {Component, Input, OnInit} from '@angular/core';
import {Chat} from '../models/chat';

@Component({
  selector: 'app-dialog-page',
  templateUrl: './dialog-page.component.html',
  styleUrls: ['./dialog-page.component.scss']
})
export class DialogPageComponent implements OnInit {

  @Input() chat: Chat;

  isOpen = false;

  constructor() { }

  ngOnInit() {
  }

  openPlaylist() {
    this.isOpen = !this.isOpen;
  }

  public send() {
    return;
  }

}
