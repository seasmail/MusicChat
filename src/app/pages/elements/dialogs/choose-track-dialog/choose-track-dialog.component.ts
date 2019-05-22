import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {MusicService} from '../../../../services/music.service';
import {Track} from '../../../../models/track';

@Component({
  selector: 'app-choose-track-dialog',
  templateUrl: './choose-track-dialog.component.html',
  styleUrls: ['../dialog.scss']
})
export class ChooseTrackDialogComponent {

  tracks: Track[];
  type = 'choose';

  constructor(
    public dialogRef: MatDialogRef<ChooseTrackDialogComponent>,
    private musicService: MusicService,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }


  search(value: string) {
    this.musicService.findTrack(value, 1)
      .subscribe(tracks => {
        this.tracks = tracks['data'];
        console.log(this.tracks['data']);
      });
  }

}
