import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from '../../services/api.service';
import { SessionService } from '../../services/session.service';

import axios from 'axios';

@Component({
	selector: 'admin-dashboard',
	templateUrl: './admin-dashboard.component.html',
	styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

	private trials: Trial[];

	constructor(
		private api: ApiService,
		private session: SessionService
		// private router: Router
	) { }

	async ngOnInit() {
		this.trials = <Trial[]> await this.getTrialList();
		console.log('this:', this);
	}

	async getTrialList() {
		// send data
		const config = {
			headers: {'Authorization': `Bearer ${ this.session.parseCookie( 'access_token' ) }`}
		};
		return await axios.get( this.api.userTrials, config) // TODO: remove hard-coded URLs into a service
		.then( (response) => {
			return response.data;
			// if( response.data.status !== 200 ) {
			// 	let message = response.data.message || "No error message was specified.";
			// 	this.session.openDialog( "Creating New Trial Failed", message );
			// } else {
			// 	this.session.openDialog( "New Trial Created", `Your trial has been created. The ID of your trial is: ${response.data.tid}.\nIt has ${response.data.groups} groups, ${response.data.surveys} surveys, and ${response.data.questions} questions.` );
			// }
			// console.log(response);
		})
		.catch( (error) => {
			console.warn(error);
			return [];
		});
	}

}

type Trial = {
	tid: string,
	title: string,
	regopen: Date,
	regclose: Date,
	trialstart: Date,
	trialend: Date,
	trialtype: string,
	timezone: string,
	created: Date,
	updated: Date
}
