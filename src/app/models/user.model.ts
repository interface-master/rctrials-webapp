export class User {
	constructor(
		public uid?: string,
		public email?: string,
		public name?: string,
		public role?: string,
		public access_token?: string,
		public refresh_token?: string,
	) { }
}
