export class SignInTokenStatus {
  username:string;
  acces_token: string;
  status: string;

  constructor(username: string,acces_token: string, status: string) {
    this.username = username;
    this.acces_token = acces_token;
    this.status = status;
  }
  getusername(): string {
    return this.status;
  }

  getAcces_token(): string {
    return this.acces_token;
  }

  getStatus(): string {
    return this.status;
  }
}
