class Employee {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    work() {
        console.log(`${this.name} is working`);
    }
}

class Manager extends Employee {
    manage() {
        console.log(`${this.name} is the manager`);
    }
}

let m1 = new Manager("Ushosi");
m1.work();
m1.manage();