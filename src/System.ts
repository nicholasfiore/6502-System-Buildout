// import statements for hardware
import { listeners } from "process";
import { Clock } from "./hardware/Clock";
import {Cpu} from "./hardware/Cpu";
import {Hardware} from "./hardware/Hardware";
import {Memory} from "./hardware/Memory";
import { Mmu } from "./hardware/Mmu";

/*
    Constants
 */
// Initialization Parameters for Hardware
// Clock cycle interval
const CLOCK_INTERVAL= 500;              // This is in ms (milliseconds) so 1000 = 1 second, 100 = 1/10 second
                                        // A setting of 100 is equivalent to 10hz, 1 would be 1,000hz or 1khz,
                                        // .001 would be 1,000,000 or 1mhz. Obviously you will want to keep this
                                        // small, I recommend a setting of 100, if you want to slow things down
                                        // make it larger.


export class System extends Hardware{

    private _CPU : Cpu = null;
    private _MEM : Memory = null;
    private _CLK : Clock = null;
    private _MMU : Mmu = null;
    
    public running: boolean = false;

    constructor() {
        super();
        console.log("Hello TSIRAM!");
        
        //initialization of members from the superclass constructor
        this.id = 0;
        this.name = "SYS";

        //creating objects for the system hardware
        
        this._MEM = new Memory();
        this._CLK = new Clock();
        this._MMU = new Mmu(this._MEM);
        this._CPU = new Cpu(this._MMU);
        /*
        Start the system (Analogous to pressing the power button and having voltages flow through the components)
        When power is applied to the system clock, it begins sending pulses to all clock observing hardware
        components so they can act on each clock cycle.
         */

        this.startSystem();
    }

    public startSystem(): boolean {
        /* debugging lines to test functionality of the console logging for hardware initialization */
        this.debug = true;
        this._CPU.debug = true;
        this._MEM.debug = false;
        this._CLK.debug = false;
        this._MMU.debug = false;
        
        //initial logs for all hardware pieces
        this.log("created");
        this._CPU.log("created");
        this._MEM.log("created - Addressable space : " + this._MEM.getMemSize());
        this._CLK.log("created");
        this._MMU.log("created");

        //begins memory initialization by setting all addresses to 0x00
        this._MEM.initMemory();
        this._MMU.log("Initialized Memory");

        //initialization of the "static" program
        this._MMU.writeImmediate(0x0000, 0xA9);
        this._MMU.writeImmediate(0x0001, 0x0D);
        this._MMU.writeImmediate(0x0002, 0xA9);
        this._MMU.writeImmediate(0x0003, 0x1D);
        this._MMU.writeImmediate(0x0004, 0xA9);
        this._MMU.writeImmediate(0x0005, 0x2D);
        this._MMU.writeImmediate(0x0006, 0xA9);
        this._MMU.writeImmediate(0x0007, 0x3F);
        this._MMU.writeImmediate(0x0008, 0xA9);
        this._MMU.writeImmediate(0x0009, 0xFF);
        this._MMU.writeImmediate(0x000A, 0x00);

        //dump test program + extra slots in memory
        this._MMU.memoryDump(0x0000, 0x000F);

        //adds all clock listeners to the array in the _CLK object
        this._CLK.setCL(this._CPU);
        this._CLK.setCL(this._MEM);

        //sets the interval that the clock will run at and begins sending pulses
        setInterval(() => {
            this._CLK.sendPulse();
            if (this._CPU.getShutdownFlag()) {
                this.stopSystem();
            }
        }, CLOCK_INTERVAL);


        
        return true;
    }
    
    public stopSystem(): boolean {

        return false;

    }
}

let system: System = new System();