//imports for Memory
import {System} from "../System";
import {Hardware} from "./Hardware";

export class Memory extends Hardware{
    /**
     * memSize used for the max size of the array (in hex), which is the size of the memory
     * memArray is the array containing the hex values stored in memory (8 bits per index)
     */
    private memSize: number;
    private memArray = [];
    
    constructor() {
        super();
        this.name = "Mem";
        this.id = 0;
    }

    /**
     * Initializes the Memory object by completely filling the array with the default values of 0x00
     */
    initMemory() {
        this.memSize = 0x100;
        for (let i = 0x00; i < this.memSize; i += 0xFF) {
            this.memArray[i] = 0x00;
        }
    }

}