import { Rooms } from "../model/rooms.js";
import { Resident } from "../model/residents.js";
import { roomsAvailability } from "../data/roomsData.js";


export class HostelService {


    private rooms: Rooms[] = [];
    private residents: Resident[] = [];

    constructor() {
        this.loadData();
    }


    // 1st Load the Data 
    loadData(): void {
        const storedRooms = localStorage.getItem('rooms'); //! Browser provide this local storage -- upto 5 Mb
        const storedResidents = localStorage.getItem('residents');



        if (storedRooms) {
            this.rooms = JSON.parse(storedRooms);
        } else {
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

    saveData(): void {
        localStorage.setItem('rooms', JSON.stringify(this.rooms));
        localStorage.setItem('residents', JSON.stringify(this.residents));
    }


    //! Add User


    addResident(name: string, age: number, phone: string, checkInDate: string, roomNumber: number) {

        // Room Check
        const room = this.rooms.find(room => room.roomNumber === roomNumber);
        if (!room) {
            throw new Error('Room not found');
        } else if (room.isOccupied) {
            throw new Error('Room is already occupied');
        }

        // Add User
        const newResident: Resident = {
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

    removeResident(id: string): void {
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



    updateResident(id: string, updatedData: Partial<Resident>) {
        const residentIndex = this.residents.findIndex(r => r.id === id);
        if (residentIndex === -1) {
            throw new Error('Resident not found');
        }

        const resident = this.residents[residentIndex];

        if (updatedData.roomNumber && updatedData.roomNumber !== resident.roomNumber) {
            const oldRoom = this.rooms.find(room => room.roomNumber === resident.roomNumber);
            const newRoom = this.rooms.find(room => room.roomNumber === updatedData.roomNumber);

            if (!newRoom) throw new Error('New room not found');
            if (newRoom.isOccupied) throw new Error('New room is already occupied');

            if (oldRoom) oldRoom.isOccupied = false;
            newRoom.isOccupied = true;
        }

        this.residents[residentIndex] = { ...resident, ...updatedData };

        this.saveData();
    }

    searchResident(keyword: string): Resident[] {
        return this.residents.filter(resident =>
            resident.name.toLowerCase().includes(keyword.toLowerCase()) ||
            resident.phone.includes(keyword)
        );
    }

    getResidentByRoom(roomNumber: number): Resident | undefined {
        return this.residents.find(resident => resident.roomNumber === roomNumber);
    }

    getTotalResidents(): number {
        return this.residents.length;
    }

    resetSystem(): void {
        this.rooms = roomsAvailability.map(room => ({
            ...room,
            isOccupied: false
        }));

        this.residents = [];

        this.saveData();
    }




}
