import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog-page',
  templateUrl: './dialog-page.component.html',
  styleUrls: ['./dialog-page.component.scss']
})
export class DialogPageComponent implements OnInit {
  isOpen = false;

  constructor() { }

  ngOnInit() {
  }

  openPlaylist() {
    this.isOpen = !this.isOpen;
    // console.log('clicked' + this.isOpen);
  }

}
