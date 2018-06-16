import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
// import { FormGroup, FormControl } from '@angular/forms';

// import { SessionService } from "../../services/session.service";
import { SpinnerService } from "../../services/spinner.service";


@Component({
	selector: 'app-spinner',
	templateUrl: './spinner.component.html',
	styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

	private isShowing: boolean = false;

	@Input() name: string;

	@Input()
	get show(): boolean {
		console.log('spinner',this.name,"is",this.isShowing);
		return this.isShowing;
	}

	@Output() showChange = new EventEmitter();
	set show(val: boolean) {
		console.log('spinner',this.name,"setting to",val);
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
