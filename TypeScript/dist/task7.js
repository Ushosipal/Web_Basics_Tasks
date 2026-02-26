class Shape {
}
class Circle extends Shape {
    constructor(radius) {
        super();
        this.radius = radius;
    }
    calculateArea() {
        return 3.14 * this.radius * this.radius;
    }
}
let circle = new Circle(5);
console.log(circle.calculateArea());
export {};
