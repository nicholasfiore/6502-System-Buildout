//imports for System
import {System} from "../System";
import {Hardware} from "./Hardware";
import { ClockListener } from "./imp/ClockListener";

export class Cpu extends Hardware implements ClockListener {
    private cpuClockCounter : number;
    constructor() {
        super();
        this.cpuClockCounter = 0;
        this.name = "Cpu";
        this.id = 0;
    }

    //Pulse method for ClockListener class
    pulse() {
        this.cpuClockCounter++;
        this.log("received clock pulse - CPU Clock Count: ");
    }
}
