import { Cpu } from "./Cpu";
import { Hardware } from "./Hardware";
import { Memory } from "./Memory";

/* Memory Management Unit
 * Handles communication and operations between memory and the CPU
 */
export class Mmu extends Hardware {

    mem : Memory = null;
    cpu : Cpu = null;

    highOrderByte : number;
    lowOrderByte :number;

    constructor(newMem : Memory) {
        super();
        this.name = "MMU"
        this.id = 0;
        this.mem = newMem;
    }

    //reads the memory address stored in the high and low order bytes
    public read() {
        let addr : number = (this.highOrderByte * 0x100) + this.lowOrderByte;
        
        this.mem.setMar(addr);
        console.log("MAR: " + this.mem.getMar());
        return this.mem.read();
    }

    //reads the memory address passed
    public readImmediate(addr: number) {
        this.mem.setMar(addr);
        console.log("MAR: " + this.mem.getMar());
        console.log("Mem Read: " + this.hexLog(this.mem.read(), 2));
        return this.mem.read();
    }

    //writes the data provided into the address in the high and low order bytes
    public write(data: number) {
        let addr : number = (this.highOrderByte * 0x100) + this.lowOrderByte;

        this.mem.setMar(addr);
        this.mem.setMdr(data);
        this.mem.write();
    }

    //writes the data provided into the address provided
    public writeImmediate(addr: number, data: number) {
        this.mem.setMar(addr);
        this.mem.setMdr(data);
        this.mem.write();
    }

    public memoryDump(fromAddress: number, toAddress: number) {
        this.log("Memory Dump: Debug");
        this.log("--------------------------------------");
        for(let addr = fromAddress; addr <= toAddress; addr++) {
            this.mem.setMar(addr);
            this.mem.read();
            this.log("Addr " + this.hexLog(addr, 4) + " | " + this.hexLog(this.mem.getMdr(), 2));
        }
        this.log("--------------------------------------");
        this.log("Memory Dump: Complete");
    }

    /* Accessors/Mutators */
    public getHighOrderByte() : number {
        return this.highOrderByte;
    }

    public getLowOrderByte() : number {
        return this.lowOrderByte;
    }

    public setHighOrderByte(byte: number) {
        this.highOrderByte = byte;
    }

    public setLowOrderByte(byte: number) { 
        this.lowOrderByte = byte;
    }
}