import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Trial } from '../../models/trial.model';
import { ApiService } from '../../services/api.service';

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
		// private router: Router
	) { }

	async ngOnInit() {
		this.trials = <Trial[]> await this.getTrialList();
	}

	async getTrialList() {
		// send data
		const config = {
			headers: {'Authorization': `Bearer ${ this.session.userInfo.value.access_token }`}
		};
		return await axios.get( this.api.userTrials, config)
		.then( (response) => {
			if( response.status == 200 ) {
				return response.data.map( trial => {
					let now = Date.parse(Date());
					let state = { registration:null, trial:null, overall:'Unknown' };
					if( Date.parse(trial.regopen) > now ) {
						state.registration = 'Pending';
					} else if ( Date.parse(trial.regopen) < now && Date.parse(trial.regclose) > now ) {
						state.registration = 'Open';
					} else if ( Date.parse(trial.regclose) < now ) {
						state.registration = 'Closed';
					}
					if( Date.parse(trial.trialstart) > now ) {
						state.trial = 'Pending';
					} else if( Date.parse(trial.trialstart) < now && Date.parse(trial.trialend) > now ) {
						state.trial = 'Running';
					} else if( Date.parse(trial.trialend) < now ) {
						state.trial = 'Finished';
					}
					trial.status = state;
					return trial;
				});
			}
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
