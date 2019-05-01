import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-audio-dialog',
  templateUrl: './audio-dialog.component.html',
  styleUrls: ['./audio-dialog.component.scss']
})
export class AudioDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<AudioDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
