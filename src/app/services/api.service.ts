import { Injectable } from '@angular/core';

@Injectable()
export class ApiService {
	private _apiRoot:string = "http://localhost:8081/api/";

	public login:string = `${this._apiRoot}validate/login`;
	public newTrial:string = `${this._apiRoot}new/trial`;
	public register:string = `${this._apiRoot}register`;
	public trialDetails:string = `${this._apiRoot}trial/:tid`;
	public userDetails:string = `${this._apiRoot}user/details`;
	public userTrials:string = `${this._apiRoot}user/trials`;
}
