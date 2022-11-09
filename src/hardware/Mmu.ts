import { memoryUsage } from "process";
import { Cpu } from "./Cpu";
import { Hardware } from "./Hardware";
import { Memory } from "./Memory";

/* Memory Management Unit
*  Handles communication and operations between memory and the CPU
*/
export class Mmu extends Hardware {

    mem : Memory = null;
    cpu : Cpu = null;

    highOrderByte : number;
    lowOrderByte :number;

    constructor(newMem : Memory, newCpu : Cpu) {
        super();
        this.name = "MMU"
        this.id = 0;
        this.mem = newMem;
        this.cpu = newCpu;
    }

    public read() {
        let addr : number = (this.highOrderByte * 0x100) + this.lowOrderByte;
        
        this.mem.setMar(addr);
        this.mem.read();
    }

    public readImmediate(addr: number) {
        this.mem.setMar(addr);
        this.mem.read();
    }

    public write(data: number) {
        let addr : number = (this.highOrderByte * 0x100) + this.lowOrderByte;

        this.mem.setMar(addr);
        this.mem.setMdr(data);
        this.mem.write();
    }

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