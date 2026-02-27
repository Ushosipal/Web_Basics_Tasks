export class HostelService {
    constructor() {
        this.rooms = [];
        this.residents = [];
    }
    localData() {
        const storedRooms = localStorage.getItem("rooms"); //?browser will provide a 5mb local storage
        const storedResidents = localStorage.getItem("residents");
        console.log(storedRooms);
        console.log(storedResidents);
    }
}
