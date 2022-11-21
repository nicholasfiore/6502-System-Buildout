//imports for System
import {System} from "../System";
import {Hardware} from "./Hardware";
import {Mmu} from "./Mmu";
import {ClockListener} from "./imp/ClockListener";

export class Cpu extends Hardware implements ClockListener {
    
    private cpuClockCount : number;
    
    private pipelineStep : number;

    private instructionRegister : number = 0x00;
    private programCounter : number = 0x00;

    private accumulator : number = 0x00;
    private xReg : number = 0x00;
    private yReg : number = 0x00;
    
    constructor() {
        super();
        this.cpuClockCount = 0;
        this.name = "CPU";
        this.id = 0;
    }

    //Pulse method for ClockListener interface
    public pulse() {
        this.cpuClockCount++;
        this.log("received clock pulse - CPU Clock Count: " + this.cpuClockCount);

        switch

    }
}