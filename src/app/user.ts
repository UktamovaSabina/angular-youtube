export class User {
    constructor(
        public username: string,
        public password: string,
        public lastname?: string,
        public email?: string,
    ) { }
}
