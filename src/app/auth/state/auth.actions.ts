import { Authenticate } from '../models/authenticate.model';

  export class Login {
    static readonly type = '[Auth] Login';
    constructor(public payload: Authenticate) {}
  }
  ​
  export class Logout {
    static readonly type = '[Auth] Logout';
  }
  ​
  export class LoadUser {
    static readonly type = '[Auth] LoadUser';
  }
  