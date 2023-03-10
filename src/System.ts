// import statements for hardware
import { Clock } from "./hardware/Clock";
import {Cpu} from "./hardware/Cpu";
import {Hardware} from "./hardware/Hardware";
import { InterruptController } from "./hardware/InterruptController";
import { Keyboard } from "./hardware/Keyboard";
import {Memory} from "./hardware/Memory";
import { Mmu } from "./hardware/Mmu";
import { Alu } from "./hardware/Alu";

/*
    Constants
 */
// Initialization Parameters for Hardware
// Clock cycle interval
const CLOCK_INTERVAL= 100;              // This is in ms (milliseconds) so 1000 = 1 second, 100 = 1/10 second
                                        // A setting of 100 is equivalent to 10hz, 1 would be 1,000hz or 1khz,
                                        // .001 would be 1,000,000 or 1mhz. Obviously you will want to keep this
                                        // small, I recommend a setting of 100, if you want to slow things down
                                        // make it larger.


export class System extends Hardware{

    private _CPU : Cpu = null;
    private _MEM : Memory = null;
    private _CLK : Clock = null;
    private _MMU : Mmu = null;
    private _ALU : Alu = null;
    private _ITC : InterruptController = null;
    private _KBD : Keyboard = null;
    
    
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
        this._ITC = new InterruptController();
        this._KBD = new Keyboard(this._ITC);
        this._MMU = new Mmu(this._MEM);
        this._ALU = new Alu();
        this._CPU = new Cpu(this._MMU, this._ITC, this._ALU);

        
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
        this._MMU.debug = true;
        this._ITC.debug = true;
        this._KBD.debug = false;
        
        //initial logs for all hardware pieces
        this.log("created");
        this._CPU.log("created");
        this._MEM.log("created - Addressable space : " + this._MEM.getMemSize());
        this._CLK.log("created");
        this._MMU.log("created");
        this._ITC.log("created");
        this._KBD.log("created");

        //begins memory initialization by setting all addresses to 0x00
        this._MEM.initMemory();
        this._MMU.log("Initialized Memory");

        //initialization of a "static" program
        // this.labThreeStaticProgram();
        // this.powersProgram();
        // this.systemCallProgram();
        // this.addNormal();
        // this.subtractOne();
        // this.subtractTwo();
        // this.subtractThree();
        // this.subtractFour();
        // this.positiveOverflow();
        // this.doubleNegatives();
        // this.negativeOverflow();
        this.lucasSequence();

        
        //dump test program + extra slots in memory
        //this._MMU.memoryDump(0x0000, 0x000F);

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

    //Collection of programs, placed in methods to make switching between them easier
    labThreeStaticProgram() {
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
    }

    powersProgram() {
        // load constant 0
        this._MMU.writeImmediate(0x0000, 0xA9);
        this._MMU.writeImmediate(0x0001, 0x00);
        // write acc (0) to 0040
        this._MMU.writeImmediate(0x0002, 0x8D);
        this._MMU.writeImmediate(0x0003, 0x40);
        this._MMU.writeImmediate(0x0004, 0x00);
        // load constant 1
        this._MMU.writeImmediate(0x0005, 0xA9);
        this._MMU.writeImmediate(0x0006, 0x01);
        // add acc (?) to mem 0040 (?)
        this._MMU.writeImmediate(0x0007, 0x6D);
        this._MMU.writeImmediate(0x0008, 0x40);
        this._MMU.writeImmediate(0x0009, 0x00);
        // write acc ? to 0040
        this._MMU.writeImmediate(0x000A, 0x8D);
        this._MMU.writeImmediate(0x000B, 0x40);
        this._MMU.writeImmediate(0x000C, 0x00);
        // Load y from memory 0040
        this._MMU.writeImmediate(0x000D, 0xAC);
        this._MMU.writeImmediate(0x000E, 0x40);
        this._MMU.writeImmediate(0x000F, 0x00);
        // Load x with constant (1) (to make the first system call)
        this._MMU.writeImmediate(0x0010, 0xA2);
        this._MMU.writeImmediate(0x0011, 0x01);
        // make the system call to print the value in the y register (3)
        this._MMU.writeImmediate(0x0012, 0xFF);
        // Load x with constant (3) (to make the second system call for the string)
        this._MMU.writeImmediate(0x0013, 0xA2);
        this._MMU.writeImmediate(0x0014, 0x03);
        // make the system call to print the value in the y register (3)
        this._MMU.writeImmediate(0x0015, 0xFF);
        this._MMU.writeImmediate(0x0016, 0x50);
        this._MMU.writeImmediate(0x0017, 0x00);
        // test DO (Branch Not Equal) will be NE and branch (0x0021 contains 0x20 and xReg contains B2)
        this._MMU.writeImmediate(0x0018, 0xD0);
        this._MMU.writeImmediate(0x0019, 0xED);
        // globals
        this._MMU.writeImmediate(0x0050, 0x2C);
        this._MMU.writeImmediate(0x0052, 0x00);
    }

    systemCallProgram() {
        // load constant 3
        this._MMU.writeImmediate(0x0000, 0xA9);
        this._MMU.writeImmediate(0x0001, 0x0A);
        // write acc (3) to 0040
        this._MMU.writeImmediate(0x0002, 0x8D);
        this._MMU.writeImmediate(0x0003, 0x40);
        this._MMU.writeImmediate(0x0004, 0x00);
        // :loop
        // Load y from memory (3)
        this._MMU.writeImmediate(0x0005, 0xAC);
        this._MMU.writeImmediate(0x0006, 0x40);
        this._MMU.writeImmediate(0x0007, 0x00);
        // Load x with constant (1) (to make the first system call)
        this._MMU.writeImmediate(0x0008, 0xA2);
        this._MMU.writeImmediate(0x0009, 0x01);
        // make the system call to print the value in the y register (3)
        this._MMU.writeImmediate(0x000A, 0xFF);
        // Load x with constant (3) (to make the second system call for the string)
        this._MMU.writeImmediate(0x000B, 0xA2);
        this._MMU.writeImmediate(0x000C, 0x03);
        // make the system call to print the value in the y register (3)
        this._MMU.writeImmediate(0x000D, 0xFF);
        this._MMU.writeImmediate(0x000E, 0x50);
        this._MMU.writeImmediate(0x000F, 0x00);
        // load the string
        // 0A 48 65 6c 6c 6f 20 57 6f 72 6c 64 21
        this._MMU.writeImmediate(0x0050, 0x0A);
        this._MMU.writeImmediate(0x0051, 0x48);
        this._MMU.writeImmediate(0x0052, 0x65);
        this._MMU.writeImmediate(0x0053, 0x6C);
        this._MMU.writeImmediate(0x0054, 0x6C);
        this._MMU.writeImmediate(0x0055, 0x6F);
        this._MMU.writeImmediate(0x0056, 0x20);
        this._MMU.writeImmediate(0x0057, 0x57);
        this._MMU.writeImmediate(0x0058, 0x6F);
        this._MMU.writeImmediate(0x0059, 0x72);
        this._MMU.writeImmediate(0x005A, 0x6C);
        this._MMU.writeImmediate(0x005B, 0x64);
        this._MMU.writeImmediate(0x005C, 0x21);
        this._MMU.writeImmediate(0x005D, 0x0A);
        this._MMU.writeImmediate(0x005E, 0x00);
        this._MMU.memoryDump(0x0000, 0x0010);
        this._MMU.log("---------------------------");
        this._MMU.memoryDump(0x0040, 0x0043);
        this._MMU.log("---------------------------");
        this._MMU.memoryDump(0x0050, 0x005C);

        
    }
    //addition/subtraction/overflow/end-around carry checks
    //addition normal
    addNormal(){
        this._MMU.writeImmediate(0x0000, 0xA9);
        this._MMU.writeImmediate(0x0001, 0x3F);
        this._MMU.writeImmediate(0x0002, 0x8D);
        this._MMU.writeImmediate(0x0003, 0x10);
        this._MMU.writeImmediate(0x0004, 0x00);
        this._MMU.writeImmediate(0x0005, 0xA9);
        this._MMU.writeImmediate(0x0006, 0x40);
        this._MMU.writeImmediate(0x0007, 0x6D);
        this._MMU.writeImmediate(0x0008, 0x10);
        this._MMU.writeImmediate(0x0009, 0x00);
        this._MMU.writeImmediate(0x000A, 0xA8);
        this._MMU.writeImmediate(0x000B, 0xA2);
        this._MMU.writeImmediate(0x000C, 0x01);
        this._MMU.writeImmediate(0x000D, 0xFF);
        this._MMU.writeImmediate(0x000E, 0x00);
    }

    //subtraction 1: 5 - 3 = 2
    subtractOne() {
        this._MMU.writeImmediate(0x0000, 0xA9);
        this._MMU.writeImmediate(0x0001, 0x05);
        this._MMU.writeImmediate(0x0002, 0x8D);
        this._MMU.writeImmediate(0x0003, 0x10);
        this._MMU.writeImmediate(0x0004, 0x00);
        this._MMU.writeImmediate(0x0005, 0xA9);
        this._MMU.writeImmediate(0x0006, 0xFD);
        this._MMU.writeImmediate(0x0007, 0x6D);
        this._MMU.writeImmediate(0x0008, 0x10);
        this._MMU.writeImmediate(0x0009, 0x00);
        this._MMU.writeImmediate(0x000A, 0xA8);
        this._MMU.writeImmediate(0x000B, 0xA2);
        this._MMU.writeImmediate(0x000C, 0x01);
        this._MMU.writeImmediate(0x000D, 0xFF);
        this._MMU.writeImmediate(0x000E, 0x00);
    }

    //subtraction 2: -3 + 5 = 2
    subtractTwo() {
        this._MMU.writeImmediate(0x0000, 0xA9);
        this._MMU.writeImmediate(0x0001, 0xFD);
        this._MMU.writeImmediate(0x0002, 0x8D);
        this._MMU.writeImmediate(0x0003, 0x10);
        this._MMU.writeImmediate(0x0004, 0x00);
        this._MMU.writeImmediate(0x0005, 0xA9);
        this._MMU.writeImmediate(0x0006, 0x05);
        this._MMU.writeImmediate(0x0007, 0x6D);
        this._MMU.writeImmediate(0x0008, 0x10);
        this._MMU.writeImmediate(0x0009, 0x00);
        this._MMU.writeImmediate(0x000A, 0xA8);
        this._MMU.writeImmediate(0x000B, 0xA2);
        this._MMU.writeImmediate(0x000C, 0x01);
        this._MMU.writeImmediate(0x000D, 0xFF);
        this._MMU.writeImmediate(0x000E, 0x00);
    }

    //subtraction 3: 2 - 5 = -3 (FD)
    subtractThree() {
        this._MMU.writeImmediate(0x0000, 0xA9);
        this._MMU.writeImmediate(0x0001, 0x02);
        this._MMU.writeImmediate(0x0002, 0x8D);
        this._MMU.writeImmediate(0x0003, 0x10);
        this._MMU.writeImmediate(0x0004, 0x00);
        this._MMU.writeImmediate(0x0005, 0xA9);
        this._MMU.writeImmediate(0x0006, 0xFB);
        this._MMU.writeImmediate(0x0007, 0x6D);
        this._MMU.writeImmediate(0x0008, 0x10);
        this._MMU.writeImmediate(0x0009, 0x00);
        this._MMU.writeImmediate(0x000A, 0xA8);
        this._MMU.writeImmediate(0x000B, 0xA2);
        this._MMU.writeImmediate(0x000C, 0x01);
        this._MMU.writeImmediate(0x000D, 0xFF);
        this._MMU.writeImmediate(0x000E, 0x00);
    }

    //subtraction four: -5 +2 = -3
    subtractFour() {
        this._MMU.writeImmediate(0x0000, 0xA9);
        this._MMU.writeImmediate(0x0001, 0xFB);
        this._MMU.writeImmediate(0x0002, 0x8D);
        this._MMU.writeImmediate(0x0003, 0x10);
        this._MMU.writeImmediate(0x0004, 0x00);
        this._MMU.writeImmediate(0x0005, 0xA9);
        this._MMU.writeImmediate(0x0006, 0x02);
        this._MMU.writeImmediate(0x0007, 0x6D);
        this._MMU.writeImmediate(0x0008, 0x10);
        this._MMU.writeImmediate(0x0009, 0x00);
        this._MMU.writeImmediate(0x000A, 0xA8);
        this._MMU.writeImmediate(0x000B, 0xA2);
        this._MMU.writeImmediate(0x000C, 0x01);
        this._MMU.writeImmediate(0x000D, 0xFF);
        this._MMU.writeImmediate(0x000E, 0x00);
    }

    //positive overflow (result should be 40)
    positiveOverflow() {
        this._MMU.writeImmediate(0x0000, 0xA9);
        this._MMU.writeImmediate(0x0001, 0x60);
        this._MMU.writeImmediate(0x0002, 0x8D);
        this._MMU.writeImmediate(0x0003, 0x10);
        this._MMU.writeImmediate(0x0004, 0x00);
        this._MMU.writeImmediate(0x0005, 0xA9);
        this._MMU.writeImmediate(0x0006, 0x60);
        this._MMU.writeImmediate(0x0007, 0x6D);
        this._MMU.writeImmediate(0x0008, 0x10);
        this._MMU.writeImmediate(0x0009, 0x00);
        this._MMU.writeImmediate(0x000A, 0xA8);
        this._MMU.writeImmediate(0x000B, 0xA2);
        this._MMU.writeImmediate(0x000C, 0x01);
        this._MMU.writeImmediate(0x000D, 0xFF);
        this._MMU.writeImmediate(0x000E, 0x00);
    }

    //double negative
    doubleNegatives() {
        this._MMU.writeImmediate(0x0000, 0xA9);
        this._MMU.writeImmediate(0x0001, 0xF0);
        this._MMU.writeImmediate(0x0002, 0x8D);
        this._MMU.writeImmediate(0x0003, 0x10);
        this._MMU.writeImmediate(0x0004, 0x00);
        this._MMU.writeImmediate(0x0005, 0xA9);
        this._MMU.writeImmediate(0x0006, 0xED);
        this._MMU.writeImmediate(0x0007, 0x6D);
        this._MMU.writeImmediate(0x0008, 0x10);
        this._MMU.writeImmediate(0x0009, 0x00);
        this._MMU.writeImmediate(0x000A, 0xA8);
        this._MMU.writeImmediate(0x000B, 0xA2);
        this._MMU.writeImmediate(0x000C, 0x01);
        this._MMU.writeImmediate(0x000D, 0xFF);
        this._MMU.writeImmediate(0x000E, 0x00);
    }

    //negative overflow
    negativeOverflow() {
        this._MMU.writeImmediate(0x0000, 0xA9);
        this._MMU.writeImmediate(0x0001, 0x95);
        this._MMU.writeImmediate(0x0002, 0x8D);
        this._MMU.writeImmediate(0x0003, 0x10);
        this._MMU.writeImmediate(0x0004, 0x00);
        this._MMU.writeImmediate(0x0005, 0xA9);
        this._MMU.writeImmediate(0x0006, 0xA0);
        this._MMU.writeImmediate(0x0007, 0x6D);
        this._MMU.writeImmediate(0x0008, 0x10);
        this._MMU.writeImmediate(0x0009, 0x00);
        this._MMU.writeImmediate(0x000A, 0xA8);
        this._MMU.writeImmediate(0x000B, 0xA2);
        this._MMU.writeImmediate(0x000C, 0x01);
        this._MMU.writeImmediate(0x000D, 0xFF);
        this._MMU.writeImmediate(0x000E, 0x00);
    }

    //assignment 2 fibonacci/lucas #
    lucasSequence() {
        this._MMU.writeImmediate(0x0000, 0xA2);
        this._MMU.writeImmediate(0x0001, 0x01);

        this._MMU.writeImmediate(0x0002, 0xA9);
        this._MMU.writeImmediate(0x0003, 0x00);

        this._MMU.writeImmediate(0x0004, 0x8D);
        this._MMU.writeImmediate(0x0005, 0x34);
        this._MMU.writeImmediate(0x0006, 0x01);

        this._MMU.writeImmediate(0x0007, 0xA9);
        this._MMU.writeImmediate(0x0008, 0x02);

        this._MMU.writeImmediate(0x0009, 0x8D);
        this._MMU.writeImmediate(0x000A, 0x31);
        this._MMU.writeImmediate(0x000B, 0x01);

        this._MMU.writeImmediate(0x000C, 0xA8);

        this._MMU.writeImmediate(0x000D, 0xFF);

        this._MMU.writeImmediate(0x000E, 0xA9);
        this._MMU.writeImmediate(0x000F, 0x01);

        this._MMU.writeImmediate(0x0010, 0x8D);
        this._MMU.writeImmediate(0x0011, 0x32);
        this._MMU.writeImmediate(0x0012, 0x01);

        this._MMU.writeImmediate(0x0013, 0xA8);

        this._MMU.writeImmediate(0x0014, 0xFF);

        this._MMU.writeImmediate(0x0015, 0xA9);
        this._MMU.writeImmediate(0x0016, 0x06);

        this._MMU.writeImmediate(0x0017, 0x8D);
        this._MMU.writeImmediate(0x0018, 0x35);
        this._MMU.writeImmediate(0x0019, 0x01);

        this._MMU.writeImmediate(0x001A, 0xAD);
        this._MMU.writeImmediate(0x001B, 0x31);
        this._MMU.writeImmediate(0x001C, 0x01);

        this._MMU.writeImmediate(0x001D, 0x6D);
        this._MMU.writeImmediate(0x001E, 0x32);
        this._MMU.writeImmediate(0x001F, 0x01);

        this._MMU.writeImmediate(0x0020, 0x8D);
        this._MMU.writeImmediate(0x0021, 0x33);
        this._MMU.writeImmediate(0x0022, 0x01);

        this._MMU.writeImmediate(0x0023, 0xA2);
        this._MMU.writeImmediate(0x0024, 0x01);

        this._MMU.writeImmediate(0x0025, 0xA8);

        this._MMU.writeImmediate(0x0026, 0xFF);
        
        this._MMU.writeImmediate(0x0027, 0xAD);
        this._MMU.writeImmediate(0x0028, 0x32);
        this._MMU.writeImmediate(0x0029, 0x01);

        this._MMU.writeImmediate(0x002A, 0x8D);
        this._MMU.writeImmediate(0x002B, 0x31);
        this._MMU.writeImmediate(0x002C, 0x01);
        
        this._MMU.writeImmediate(0x002D, 0x98);

        this._MMU.writeImmediate(0x002E, 0x8D);
        this._MMU.writeImmediate(0x002F, 0x32);
        this._MMU.writeImmediate(0x0030, 0x01);

        this._MMU.writeImmediate(0x0031, 0xAE);
        this._MMU.writeImmediate(0x0032, 0x34);
        this._MMU.writeImmediate(0x0033, 0x01);

        this._MMU.writeImmediate(0x0034, 0xEC);
        this._MMU.writeImmediate(0x0035, 0x35);
        this._MMU.writeImmediate(0x0036, 0x01);

        this._MMU.writeImmediate(0x0037, 0xEE);
        this._MMU.writeImmediate(0x0038, 0x34);
        this._MMU.writeImmediate(0x0039, 0x01);

        this._MMU.writeImmediate(0x003A, 0xD0);
        this._MMU.writeImmediate(0x003B, 0xDE);

    }
}

let system: System = new System();