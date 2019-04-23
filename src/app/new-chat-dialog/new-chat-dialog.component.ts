import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-new-chat-dialog',
  templateUrl: './new-chat-dialog.component.html',
  styleUrls: ['./new-chat-dialog.component.scss']
})
export class NewChatDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<NewChatDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
