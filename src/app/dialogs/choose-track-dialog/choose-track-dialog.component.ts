import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-choose-track-dialog',
  templateUrl: './choose-track-dialog.component.html',
  styleUrls: ['./choose-track-dialog.component.scss']
})
export class ChooseTrackDialogComponent{

  constructor(
    public dialogRef: MatDialogRef<ChooseTrackDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
