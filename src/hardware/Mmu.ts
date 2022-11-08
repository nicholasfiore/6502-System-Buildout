import { memoryUsage } from "process";
import { Cpu } from "./Cpu";
import { Hardware } from "./Hardware";
import { Memory } from "./Memory";

/* Memory Management Unit
*  Handles communication and operations between memory and the CPU
*/
export class Mmu extends Hardware {

    mem : Memory = null;

    constructor(newMem : Memory) {
        super();
        this.name = "MMU"
        this.id = 0;
        this.mem = newMem;
    }

    public setMarEndian(lowOrder: number, highOrder: number) {
        let high : string = "" + highOrder;
        let low : string = "" + lowOrder;
        let addr : number = parseInt(high + low);
        
        this.mem.setMar(addr);
    }

    public setMarFull(addr: number) {
        this.mem.setMar(addr);
    }

    public setMdr(val: number) {
        this.mem.setMdr(val);
    }

    public read() {
        this.mem.read();
    }

    public write() {
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
}