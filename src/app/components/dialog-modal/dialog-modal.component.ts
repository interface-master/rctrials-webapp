import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
	selector: 'dialog-modal',
	templateUrl: './dialog-modal.component.html',
	styleUrls: ['./dialog-modal.component.scss']
})
export class DialogModalComponent implements OnInit {

	constructor(
		public dialogRef: MatDialogRef<DialogModalComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any
	) { }

	ngOnInit() {
	}

	onNoClick(): void {
		this.dialogRef.close();
	}

}
