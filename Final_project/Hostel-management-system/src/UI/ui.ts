import { HostelService } from "../services/hostelService.js";
import { Resident } from "../model/residents.js";

export class UI {

    private editingId: string | null = null;

    constructor(private hostelService: HostelService) { }

    initialize() {
        this.renderResidents();
        this.renderStats();
        this.populateRoomDropdown();
        this.handleFormSubmit();
        this.handleSearch();
    }

    populateRoomDropdown(currentRoom?: number) {
        const roomSelect = document.getElementById("room") as HTMLSelectElement;
        roomSelect.innerHTML = "";

        const vacantRooms = this.hostelService.getvacantRooms();

        const roomsToShow = currentRoom
            ? [...vacantRooms, { roomNumber: currentRoom, isOccupied: false }]
            : vacantRooms;

        roomsToShow.forEach(room => {
            const option = document.createElement("option");
            option.value = room.roomNumber.toString();
            option.textContent = `Room ${room.roomNumber}`;
            roomSelect.appendChild(option);
        });
    }

    handleFormSubmit() {
        const form = document.getElementById("residentForm") as HTMLFormElement;

        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const name = (document.getElementById("name") as HTMLInputElement).value;
            const age = Number((document.getElementById("age") as HTMLInputElement).value);
            const phone = (document.getElementById("phone") as HTMLInputElement).value;
            const date = (document.getElementById("date") as HTMLInputElement).value;
            const room = Number((document.getElementById("room") as HTMLSelectElement).value);

            try {
                if (this.editingId) {
                    this.hostelService.updateResident(this.editingId, {
                        name,
                        age,
                        phone,
                        checkIndate: date,
                        roomNumber: room
                    });

                    this.editingId = null;
                    (form.querySelector("button") as HTMLButtonElement).textContent =
                        "Allot Room";
                } else {
                    this.hostelService.addResident(name, age, phone, date, room);
                }
                form.reset();

                this.renderResidents();
                this.renderStats();
                this.populateRoomDropdown(); // refresh rooms
            } catch (error: any) {
                alert(error.message);
            }
        });
    }


    renderResidents(residents?: Resident[]) {
        const list = document.getElementById("residentList")!;
        list.innerHTML = "";

        const data = residents || this.hostelService.getResidents;

        data.forEach(resident => {
            const li = document.createElement("li");

            li.innerHTML = `
    <div>
        <strong>${resident.name}</strong><br/>
        Room: ${resident.roomNumber}
    </div>
    <div>
        <button class="editBtn">Edit</button>
        <button class="deleteBtn">Remove</button>
    </div>
`;

            // DELETE
            li.querySelector(".deleteBtn")!.addEventListener("click", () => {
                this.hostelService.removeResident(resident.id);
                this.renderResidents();
                this.renderStats();
                this.populateRoomDropdown();
            });

            // EDIT
            li.querySelector(".editBtn")!.addEventListener("click", () => {
                this.loadResidentToForm(resident);
            });
            list.appendChild(li);
        });
    }


    loadResidentToForm(resident: Resident) {
        (document.getElementById("name") as HTMLInputElement).value = resident.name;
        (document.getElementById("age") as HTMLInputElement).value = resident.age.toString();
        (document.getElementById("phone") as HTMLInputElement).value = resident.phone;
        (document.getElementById("date") as HTMLInputElement).value = resident.checkIndate;

        this.populateRoomDropdown(resident.roomNumber);

        (document.getElementById("room") as HTMLSelectElement).value =
            resident.roomNumber.toString();

        this.editingId = resident.id;

        (document.querySelector("form button") as HTMLButtonElement).textContent =
            "Update Resident";
    }


    renderStats() {
        const stats = this.hostelService.getRoomStates();

        document.getElementById("totalRooms")!.textContent = stats.total.toString();
        document.getElementById("occupiedRooms")!.textContent = stats.occupied.toString();
        document.getElementById("vacantRooms")!.textContent = stats.result.toString();
        document.getElementById("totalResidents")!.textContent =
            this.hostelService.getTotalResidents().toString();
    }

    handleSearch() {
        const searchInput = document.getElementById("search") as HTMLInputElement;

        searchInput.addEventListener("input", () => {
            const keyword = searchInput.value;
            const results = this.hostelService.searchResident(keyword);
            this.renderResidents(results);
        });
    }
}