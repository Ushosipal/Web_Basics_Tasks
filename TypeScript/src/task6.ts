abstract class Vehicle {
    abstract start(): void;

    stop() {
        console.log("Vehicle stopped");
    }
}

class Car extends Vehicle {
    start() {
        console.log("Car started");
    }
}

let c1 = new Car();
c1.start();
c1.stop();
