import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'exf-ex-dialog',
  templateUrl: './ex-dialog.component.html',
  styleUrls: ['./ex-dialog.component.scss']
})
export class ExDialogComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<ExDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
  }

}
