class Student {
    name: string;
    rollnumber:number
    marks: number;


    constructor(name: string, rollnumber:number, marks: number) {
        this.name = name;
        this.rollnumber=rollnumber;
        this.marks = marks;
    }

    getDetails() {
        console.log(`Name: ${this.name}, Roll NO: ${this.rollnumber} Marks: ${this.marks}`);
    }
}

let s1 = new Student("Ushosi",205, 85);
console.log(s1.name);

s1.getDetails();