import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {MusicService} from '../../services/music.service';
import {Track} from '../../models/track';

@Component({
  selector: 'app-audio-dialog',
  templateUrl: './audio-dialog.component.html',
  styleUrls: ['./audio-dialog.component.scss']
})
export class AudioDialogComponent {

  tracks: Track[];
  type = 'exactChat';

  constructor(
    private musicService: MusicService,
    public dialogRef: MatDialogRef<AudioDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(data.chat.trackListId);
    this.musicService.getTrackList(data.chat)
      .subscribe(res => {
        this.tracks = res['data'];
        console.log(this.tracks);
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
