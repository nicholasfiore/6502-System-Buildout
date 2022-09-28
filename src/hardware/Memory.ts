//imports for Memory
import {System} from "../System";
import {Hardware} from "./Hardware";
import { ClockListener } from "./imp/ClockListener";

export class Memory extends Hardware implements ClockListener {
    /**
     * memSize used for the max size of the array (in hex), which is the size of the memory
     * memArray is the array containing the hex values stored in memory (8 bits per index)
     */
    private memSize: number;
    private memArray = [];
    
    //Constuctor for memory, inherits Hardware and initializes inherited members
    constructor() {
        super();
        this.name = "Mem";
        this.id = 0;
    }

    
    // Initializes the Memory object by completely filling the array with the default values of 0x00
     
    public initMemory() {
        this.memSize = 0xFFFF;
        for (let i = 0x00; i < this.memSize; i += 0x01) {
            this.memArray[i] = 0x00;
        }
    }

    //Displays a range of memory addresses from a starting address, and including all addresses after with a length.
    public displayMemory(startAdd: number, length: number) {
        for (let i = startAdd; i < (startAdd + length); i++) {
            this.log("Memory address: " + this.hexLog(i, 4) + " contains Value: " + this.hexLog(this.memArray[i], 2));
        }
    }

    //pulse method for the ClockListener interface
    public pulse() {
        this.log("received clock pulse");
    }
}