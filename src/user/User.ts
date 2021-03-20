export class UserEntity {
  private readonly _id : number;
  private readonly _username : string;
  private readonly _email : string;
  private readonly _password: string;
  constructor(id, username, email, password) {
    this._id = id;
    this._username = username;
    this._email  =email;
    this._password = password
  }

  get id(): number {
    return this._id;
  }

  get username(): string {
    return this._username;
  }

  get email(): string {
    return this._email;
  }

  get password(): string {
    return this._password;
  }
}
