import {Rooms} from "../model/rooms";
import { Resident } from "../model/residents";
import {roomsAvailability} from "../data/roomsData";

export class HostelService{
    private rooms: Rooms[]=[];
    private residents: Resident[]=[];
    constructor(){

    }
    localData():void{
        const storedRooms=localStorage.getItem("rooms");   //?browser will provide a 5mb local storage
        const storedResidents=localStorage.getItem("residents");
        console.log(storedRooms);
        console.log(storedResidents);
        
        
   
    }}