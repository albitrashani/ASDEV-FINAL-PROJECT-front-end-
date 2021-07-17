export class SignInData {
    username: string;
    private password: string;


    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }

    getusername(): string {
        return this.username;
    }

    getPassword(): string {
        return this.password;
    }
}
