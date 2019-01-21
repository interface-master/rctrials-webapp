import { Injectable } from '@angular/core';

@Injectable()
export class ApiService {
	private _apiRoot:string = "http://localhost/";

	public login:string = `${this._apiRoot}validate/login`;
	public register:string = `${this._apiRoot}register`;
	public userDetails:string = `${this._apiRoot}user/details`;
}
