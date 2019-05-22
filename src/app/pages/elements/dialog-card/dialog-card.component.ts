import {Component, Input, OnInit} from '@angular/core';
import {Chat} from '../../../models/chat';

@Component({
  selector: 'app-dialog-card',
  templateUrl: './dialog-card.component.html',
  styleUrls: ['./dialog-card.component.scss']
})
export class DialogCardComponent implements OnInit {
  @Input() chat: Chat;

  constructor() { }

  ngOnInit() {
  }

}
