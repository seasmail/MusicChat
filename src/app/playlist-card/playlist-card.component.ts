import {Component, Input, OnInit} from '@angular/core';
import {Chat} from '../models/chat';

@Component({
  selector: 'app-playlist-card',
  templateUrl: './playlist-card.component.html',
  styleUrls: ['./playlist-card.component.scss']
})
export class PlaylistCardComponent implements OnInit {

  @Input() chat: Chat;
  constructor() { }

  ngOnInit() {
  }

}
