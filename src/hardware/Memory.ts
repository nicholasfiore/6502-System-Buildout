//imports for Memory
import {System} from "../System";
import {Hardware} from "./Hardware";

export class Memory extends Hardware{
    /**
     * memSize used for the max size of the array (in hex)
     * memArray is the array containing the hex values in each address in the array (8 bits per address)
     */
    private memSize: number;
    private memArray: number[];
    
    constructor() {
        super();
        this.name = "Memory";
        this.id = 0;
    }

}