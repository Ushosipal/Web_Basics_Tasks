abstract class Shape {
    abstract calculateArea(): number;
}

class Circle extends Shape {
    constructor(private radius: number) {
        super();
    }

    calculateArea(): number {
        return 3.14 * this.radius * this.radius;
    }
}

let circle = new Circle(5);
console.log(circle.calculateArea());