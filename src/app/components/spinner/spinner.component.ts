import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { SpinnerService } from "../../services/spinner.service";


@Component({
	selector: 'app-spinner',
	templateUrl: './spinner.component.html',
	styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

	public isShowing: boolean = true;

	@Input() name: string;

	@Input()
	get show(): boolean {
		return this.isShowing;
	}

	@Output() showChange = new EventEmitter();
	set show(val: boolean) {
		this.isShowing = val;
		this.showChange.emit(this.isShowing);
	}

	constructor(
		private spinnerService: SpinnerService
	) { }

	ngOnInit() {
		if (!this.name) throw new Error("Spinner must have a 'name' attribute.");
		this.spinnerService._register(this);
	}

}
