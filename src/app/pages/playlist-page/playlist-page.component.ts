import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {NewChatDialogComponent} from '../../new-chat-dialog/new-chat-dialog.component';
import {AudioDialogComponent} from '../../audio-dialog/audio-dialog.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-playlist-page',
  templateUrl: './playlist-page.component.html',
  styleUrls: ['./playlist-page.component.scss']
})
export class PlaylistPageComponent implements OnInit {

  currentSong: string;

  constructor(
    public dialog: MatDialog,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  back() {
    this.router.navigateByUrl('/chat');
  }

  openAudio(): void {
    const dialogRef = this.dialog.open(AudioDialogComponent, {
      width: '400px',
      data: {name: null, participants: null}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.currentSong = result;
    });
  }

}
