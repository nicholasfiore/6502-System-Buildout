// import statements for hardware
import { listeners } from "process";
import { Clock } from "./hardware/Clock";
import {Cpu} from "./hardware/Cpu";
import {Hardware} from "./hardware/Hardware";
import {Memory} from "./hardware/Memory";

/*
    Constants
 */
// Initialization Parameters for Hardware
// Clock cycle interval
const CLOCK_INTERVAL= 500;               // This is in ms (milliseconds) so 1000 = 1 second, 100 = 1/10 second
                                        // A setting of 100 is equivalent to 10hz, 1 would be 1,000hz or 1khz,
                                        // .001 would be 1,000,000 or 1mhz. Obviously you will want to keep this
                                        // small, I recommend a setting of 100, if you want to slow things down
                                        // make it larger.


export class System extends Hardware{

    private _CPU : Cpu = null;
    private _MEM : Memory = null;
    private _CLK : Clock = null;
    
    public running: boolean = false;

    constructor() {
        super();
        console.log("Hello TSIRAM!");
        
        //initialization of members from the superclass constructor
        this.id = 0;
        this.name = "System";

        //creating objects for the system hardware
        this._CPU = new Cpu();
        this._MEM = new Memory();
        this._CLK = new Clock();
        /*
        Start the system (Analogous to pressing the power button and having voltages flow through the components)
        When power is applied to the system clock, it begins sending pulses to all clock observing hardware
        components so they can act on each clock cycle.
         */

        this.startSystem();
    }

    public startSystem(): boolean {
        /* debugging lines to test functionality of the console logging for hardware initialization */
        //this.debug = false;
        //this._CPU.debug = false;
        //this._MEM.debug = false;

        //begins memory initialization by setting all addresses to 0x00
        this._MEM.initMemory();
        
        //initial logs for all hardware pieces
        this.log("created");
        this._CPU.log("created");
        this._MEM.log("created");
        this._CLK.log("created");

        //adds all clock listeners to the array in the _CLK object
        this._CLK.setCL(this._CPU);
        this._CLK.setCL(this._MEM);

        //sets the interval that the clock will run at and begins sending pulses
        setInterval(() => {
            this._CLK.sendPulse();
        }, CLOCK_INTERVAL);

        
        return true;
    }

    public stopSystem(): boolean {

        return false;

    }
}

let system: System = new System();