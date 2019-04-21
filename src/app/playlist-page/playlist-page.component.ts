import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-playlist-page',
  templateUrl: './playlist-page.component.html',
  styleUrls: ['./playlist-page.component.scss']
})
export class PlaylistPageComponent implements OnInit {

  @Input()
  width: number;

  constructor() { }

  ngOnInit() {
  }


}
