//imports for System
import {System} from "../System";
import {Hardware} from "./Hardware";
import {Mmu} from "./Mmu";
import {ClockListener} from "./imp/ClockListener";

export class Cpu extends Hardware implements ClockListener {
    
    private cpuClockCount : number;
    private mmu : Mmu;
    
    private pipelineStep : number;

    //special registers
    private instructionRegister : number = 0x00;
    private programCounter : number = 0x00;

    //registers
    private accumulator : number = 0x00;
    private xReg : number = 0x00;
    private yReg : number = 0x00;

    //flags
    private zflag : boolean = false;
    private isAddr :  boolean = false;
    private noOperands : boolean = false;

    constructor(newMmu : Mmu) {
        super();
        this.cpuClockCount = 0;
        this.name = "CPU";
        this.id = 0;
        this.mmu = newMmu;
    }

    //Pulse method for ClockListener interface
    public pulse() {
        this.cpuClockCount++;
        this.log("received clock pulse - CPU Clock Count: " + this.cpuClockCount);

        let stepQueue = [];
        /* 
         * Current step will be represented by a number. They are listed below:
         * 0 - fetch
         * 1 - decode
         * 2 - decode
         * 3 - execute
         * 4 - execute
         * 5 - writeBack
         * 6 - interruptCheck
         */
        if (this.pipelineStep === 0) {
            stepQueue = this.fetch();
        }
        switch(stepQueue.shift()) {
            case 1: {
                this.decode();
                break;        
            }
            case 2: {
                
                break;
            }
            case 3: {
                //execute()
            }
            case 4: {
                
            }
            case 5: {
                //writeBack()
            }
            case 6: {
                //interruptCheck()
            }
        }
    }

    fetch() {
        this.instructionRegister = this.mmu.readImmediate(this.programCounter);
        this.programCounter++;
        return this.determineSteps();
    }

    decode() { //the first decode used
        this.mmu.readImmediate(this.programCounter);
        this.programCounter++;
    }

    execute() {

    }

    writeBack() {

    }

    interruptCheck() {

    }


    determineSteps() {
        let arr = [];
        switch (this.instructionRegister) {
            case 0xA9: {
                arr = [1, 3, 6];
                break;
            }
            case 0xAD: {
                arr = [1, 2, 3, 6];
                this.isAddr = true;
                break;
            }
            case 0x8D: {
                arr = [1, 2, 3, 6];
                this.isAddr = true;
                break;
            }
            case 0x8A: {
                arr = [3, 6];
                break;
            }
            case 0x98: {
                arr = [3, 6];
                break;
            }
            case 0x6D: {
                arr = [1, 2, 3, 6];
                this.isAddr = true;
                break;
            }
            case 0xA2: {
                arr = [1, 3, 6];
                break;
            }
            case 0xAE: {
                arr = [1, 2, 3, 6];
                this.isAddr = true;
                break;
            }
            case 0xAA: {
                arr = [3, 6];
                break;
            }
            case 0xA0: {
                arr = [1, 3, 6];
                break;
            }
            case 0xAC: {
                arr = [1, 2, 3, 6];
                this.isAddr = true;
                break;
            }
            case 0xA8: {
                arr = [3, 6];
                break;
            }
            case 0xEA: {
                arr = [3, 6];
                break;
            }
            case 0x00: {
                arr = [3, 6];
                break;
            }
            case 0xEC: {
                arr = [1, 2, 3, 6];
                this.isAddr = true;
                break;
            }

        }
        return arr;
    }
}