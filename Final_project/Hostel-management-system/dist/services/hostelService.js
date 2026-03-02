import { roomsAvailability } from "../data/roomsData.js";
export class HostelService {
    constructor() {
        this.rooms = [];
        this.residents = [];
        this.loadData();
    }
    // 1st Load the Data 
    loadData() {
        const storedRooms = localStorage.getItem('rooms'); //! Browser provide this local storage -- upto 5 Mb
        const storedResidents = localStorage.getItem('residents');
        if (storedRooms) {
            this.rooms = JSON.parse(storedRooms);
        }
        else {
            this.rooms = roomsAvailability;
        }
        if (storedResidents) {
            this.residents = JSON.parse(storedResidents);
        }
        else {
            this.residents = [];
        }
        console.log(this.rooms);
        console.log(this.residents);
    }
    // ? getters for room and residents
    get getRooms() {
        return this.rooms;
    }
    get getResidents() {
        return this.residents;
    }
    //! storing the data 
    saveData() {
        localStorage.setItem('rooms', JSON.stringify(this.rooms));
        localStorage.setItem('residents', JSON.stringify(this.residents));
    }
    //!validate name and age
    validateNameAndAge(name, age) {
        const nameRegex = /^[A-Za-z ]{3,}$/;
        if (!nameRegex.test(name.trim())) {
            throw new Error("Name must contain only letters and be at least 3 characters long.");
        }
        if (isNaN(age) || age < 18) {
            throw new Error("Age must be 18 or above.");
        }
    }
    //! Add User
    addResident(name, age, phone, checkInDate, roomNumber) {
        this.validateNameAndAge(name, age);
        // Room Check
        const room = this.rooms.find(room => room.roomNumber === roomNumber);
        if (!room) {
            throw new Error('Room not found');
        }
        else if (room.isOccupied) {
            throw new Error('Room is already occupied');
        }
        // Add User
        const newResident = {
            id: Date.now().toString(),
            name: name,
            age: age,
            phone: phone,
            checkIndate: checkInDate,
            roomNumber: roomNumber
        };
        this.residents.push(newResident);
        room.isOccupied = true;
        this.saveData();
        console.log(this.residents);
        console.log(this.rooms);
    }
    // removeUser
    removeResident(id) {
        const residentIndex = this.residents.findIndex(r => r.id === id);
        if (residentIndex === -1) {
            throw new Error("Resident not found");
        }
        const resident = this.residents[residentIndex];
        const room = this.rooms.find(r => r.roomNumber === resident.roomNumber);
        if (room) {
            room.isOccupied = false;
        }
        // Remove resident using splice (more efficient than filter)
        this.residents.splice(residentIndex, 1);
        this.saveData();
    }
    getvacantRooms() {
        return this.rooms.filter(room => !room.isOccupied);
    }
    getOccupiedRooms() {
        return this.rooms.filter(room => room.isOccupied);
    }
    getRoomStates() {
        const total = this.rooms.length;
        const occupied = this.rooms.filter(room => room.isOccupied).length;
        const result = total - occupied;
        return { total, occupied, result };
    }
    updateResident(id, updatedData) {
        var _a, _b;
        const residentIndex = this.residents.findIndex(r => r.id === id);
        if (residentIndex === -1) {
            throw new Error('Resident not found');
        }
        const resident = this.residents[residentIndex];
        const finalName = (_a = updatedData.name) !== null && _a !== void 0 ? _a : resident.name;
        const finalAge = (_b = updatedData.age) !== null && _b !== void 0 ? _b : resident.age;
        this.validateNameAndAge(finalName, finalAge);
        if (updatedData.roomNumber && updatedData.roomNumber !== resident.roomNumber) {
            const oldRoom = this.rooms.find(room => room.roomNumber === resident.roomNumber);
            const newRoom = this.rooms.find(room => room.roomNumber === updatedData.roomNumber);
            if (!newRoom)
                throw new Error('New room not found');
            if (newRoom.isOccupied)
                throw new Error('New room is already occupied');
            if (oldRoom)
                oldRoom.isOccupied = false;
            newRoom.isOccupied = true;
        }
        this.residents[residentIndex] = Object.assign(Object.assign({}, resident), updatedData);
        this.saveData();
    }
    searchResident(keyword) {
        return this.residents.filter(resident => resident.name.toLowerCase().includes(keyword.toLowerCase()) ||
            resident.phone.includes(keyword));
    }
    getResidentByRoom(roomNumber) {
        return this.residents.find(resident => resident.roomNumber === roomNumber);
    }
    getTotalResidents() {
        return this.residents.length;
    }
    resetSystem() {
        this.rooms = roomsAvailability.map(room => (Object.assign(Object.assign({}, room), { isOccupied: false })));
        this.residents = [];
        this.saveData();
    }
}
