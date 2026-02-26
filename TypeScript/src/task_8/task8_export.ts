export class User {
    constructor(public name: string) {}

    greet() {
        console.log(`This is ${this.name}, from Haldia`);
    }
}