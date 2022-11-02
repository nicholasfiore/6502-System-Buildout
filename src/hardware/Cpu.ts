//imports for System
import {System} from "../System";
import {Hardware} from "./Hardware";
import {Mmu} from "./Mmu";
import {ClockListener} from "./imp/ClockListener";

export class Cpu extends Hardware implements ClockListener {
    private cpuClockCount : number;
    constructor() {
        super();
        this.cpuClockCount = 0;
        this.name = "Cpu";
        this.id = 0;
    }

    //Pulse method for ClockListener interface
    public pulse() {
        this.cpuClockCount++;
        this.log("received clock pulse - CPU Clock Count: " + this.cpuClockCount);
    }
}
