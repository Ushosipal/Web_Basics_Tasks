type Role = "admin" | "user" | "guest";

type User = {
    name: string;
    role: Role;
};

function assignRole(user: User) {
    console.log(`${user.name} is assigned role: ${user.role}`);
}

let u1: User = { name: "Ushosi", role: "admin" };
assignRole(u1);