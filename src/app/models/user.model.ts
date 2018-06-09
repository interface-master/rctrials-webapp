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

// export interface Login {
// 	email: string;
// 	pass: string;
// 	salt: string;
// 	hash: string;
// }

// export class LoginForm {
//
//   constructor(
//     public email?: string,
//     public pass?: string,
//     public salt?: string,
//     public hash?: string
//   ) {  }
//
// }
