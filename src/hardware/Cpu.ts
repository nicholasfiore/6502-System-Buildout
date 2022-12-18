//imports for System
import {Hardware} from "./Hardware";
import {Mmu} from "./Mmu";
import {ClockListener} from "./imp/ClockListener";
import { Ascii } from "./util/Ascii";
import { InterruptController } from "./InterruptController";
import { Alu } from "./Alu";

export class Cpu extends Hardware implements ClockListener {
    
    private cpuClockCount : number;
    private mmu : Mmu;
    private intContr : InterruptController; 
    private alu : Alu;

    private pipelineStep : number = 0x00;
    private stepQueue = []; //used to keep track of the order of the pipeline steps

    private data : number; //the data at a memory location. Used for operands like constants.

    //special registers
    private instructionRegister : number = 0x00;
    private programCounter : number = 0x00;

    //registers
    private accumulator : number = 0x00;
    private xReg : number = 0x00;
    private yReg : number = 0x00;

    //flags
    private zFlag : boolean = false;
    private isAddr :  boolean = false;
    private noOperands : boolean = false;
    private shutdownFlag : boolean = false;
    private initialCall : boolean = true;
    private carryFlag : boolean = false;

    constructor(newMmu : Mmu, newIC : InterruptController, newAlu : Alu) {
        super();
        this.cpuClockCount = 0;
        this.name = "CPU";
        this.id = 0;
        this.mmu = newMmu;
        this.intContr = newIC;
        this.alu = newAlu;
    }

    public logState() {
        this.log("CPU State | Mode: " + 0 + " PC: " + this.hexLog(this.programCounter, 4) +
            " IR: " + this.hexLog(this.instructionRegister, 2) + " Acc: " + this.hexLog(this.accumulator, 2) +
            " xReg: " + this.hexLog(this.xReg, 2) + " yReg: " + this.hexLog(this.yReg, 2) + 
            " zFlag: " + this.zFlag + " Step: " + this.pipelineStep);
    }

    //Pulse method for ClockListener interface
    public pulse() {
        this.cpuClockCount++;
        //this.log("received clock pulse - CPU Clock Count: " + this.cpuClockCount);
        this.logState();
        
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
        switch(this.pipelineStep) {
            case 0: {
                this.stepQueue = this.fetch();
                this.pipelineStep = this.stepQueue.shift();
                break;
            }
            case 1: {
                this.decode();
                this.pipelineStep = this.stepQueue.shift();
                break;
            }
            case 2: {
                this.decode();
                this.pipelineStep = this.stepQueue.shift();
                break;
            }
            case 3: {
                this.execute(this.data);
                
                this.pipelineStep = this.stepQueue.shift();
                break;
            }
            case 4: {
                this.execute(this.data);
                this.pipelineStep = this.stepQueue.shift();
                break;
            }
            case 5: {
                this.writeBack();
                this.pipelineStep = this.stepQueue.shift();
                break;
            }
            case 6: {
                this.interruptCheck();
                this.pipelineStep = 0;
                this.noOperands = false;
                this.isAddr = false;
                this.initialCall = true;
                break;
            }
        }
    }

    fetch() {
        this.instructionRegister = this.mmu.readImmediate(this.programCounter);
        this.programCounter++;
        return this.determineSteps();
    }

    decode() { //decode step. Takes two paths depending on the type of data being fed
        if (this.pipelineStep === 1) {
            if (this.isAddr){
                this.mmu.setLowOrderByte(this.mmu.readImmediate(this.programCounter));
            } else {
                this.data = this.mmu.readImmediate(this.programCounter);
            }
        } else if (this.pipelineStep === 2) {
            this.mmu.setHighOrderByte(this.mmu.readImmediate(this.programCounter));
        }
        this.programCounter++;
        return;
    }

    //a switch statement holding all the instructions for what to do during the execution cycle
    //for every opcode
    execute(byte : number) {
        //a switch statement holding all the instructions for what to do during the execution cycle
        //for every opcode
        switch (this.instructionRegister) {
            case 0xA9: { //loads the accumulator with a constant
                this.accumulator = byte;
                break;
            }
            case 0xAD: { //loads the accumulator with a value from memory
                this.accumulator = this.mmu.read();
                break;
            }
            case 0x8D: { //store the value in the accumulator in memory
                this.mmu.write(this.accumulator);
                break;
            }
            case 0x8A: { //load accu from x reg
                this.accumulator = this.xReg;
                break;
            }
            case 0x98: { //load accu from y reg
                this.accumulator = this.yReg;
                break;
            }
            case 0x6D: { //add with carry
                this.accumulator = this.alu.addWithCarry(this.accumulator, this.mmu.read());

                // let acc = this.accumulator;
                // let read = this.mmu.read();
                // //handles two's complement
                // if (acc > 0x7F)
                //     acc = acc - 0xFF;
                // if (read > 0x7F)
                //     read = read - 0xFF;
                
                // let result = acc + read;
                // if (result > 0xFF && read > 0 && acc > 0) { //positive overflow
                //     result = result - 0xFF;
                //     this.carryFlag = true;
                // }

                // if (result < 0 && acc < 0 && acc < 0) { //negative underflow
                //     result = result + 0xFF;
                // }
                

                // if (result < 0 && ((acc < 0  && !(read < 0)) || (read < 0  && !(acc < 0)))) //end around carry
                //     result = result - 0x1;
                
                // //this.accumulator += this.mmu.read();
                // this.accumulator = result;
                // break;
            }
            case 0xA2: { //load x reg with a constant
                this.xReg = byte;
                break;
            }
            case 0xAE: { //load x reg from memory
                this.xReg = this.mmu.read();
                break;
            }
            case 0xAA: { //load x from the accu
                this.xReg = this.accumulator;
                break;
            }
            case 0xA0: { //load y with constant
                this.yReg = byte;
                break;
            }
            case 0xAC: { //load y from memory
                this.yReg = this.mmu.read();
                break;
            }
            case 0xA8: { //load y from accu
                this.yReg = this.accumulator;
                break;
            }
            case 0xEA: { //no operation
                break;
            }
            case 0x00: { //break
                process.exit();
                break;
            }
            case 0xEC: { //compare a byte in mem to the x reg. Sets z flag to 1 (true) if equal
                if (this.mmu.read() === this.xReg)
                    this.zFlag = true;
                break;
            }
            case 0xD0: { //branch n bytes if z flag = 0 (false). Byte value is signed, using 2's complement.
                let signedByte : number;
                if (byte >= 0x80) {
                    signedByte = byte - 0x100;
                } else {
                    signedByte = byte;
                }
                if (!this.zFlag) {
                    this.programCounter += signedByte;
                }
                break;
            }
            case 0xEE: { //increment the value of a byte
                if (this.pipelineStep === 3) { //put byte in accumulator
                    this.accumulator = this.mmu.read();
                } else if (this.pipelineStep === 4) {
                    this.accumulator++;
                }
                break;
            }
            case 0xFF: {
                switch(this.xReg) {
                    case 0x01: { //print int in y reg
                        process.stdout.write(this.hexLog(this.yReg, 1));
                        break;
                    }
                    case 0x02: { //print string stored at address in the y reg, terminated by 0x00
                        if (this.initialCall) {
                            this.mmu.setLowOrderByte(this.yReg);
                            this.initialCall = false;
                        }
                        if (this.mmu.read() != 0x00) {
                            process.stdout.write(Ascii.toAscii(this.mmu.read()) + "");
                            this.stepQueue.unshift(3);
                            if (this.mmu.getLowOrderByte() === 0xFF) {
                                this.mmu.setHighOrderByte(this.mmu.getHighOrderByte() + 0x1);
                                this.mmu.setLowOrderByte(0x00);
                            }
                            else {
                                this.mmu.setLowOrderByte(this.mmu.getLowOrderByte() + 0x1);
                            }
                        }
                        else {
                            this.stepQueue = [6];
                        }
                        break;
                    }
                    case 0x03: { //print string stored at address in operand, terminated by 0x00
                        if (this.mmu.read() != 0x00) {
                            process.stdout.write(Ascii.toAscii(this.mmu.read()) + "");
                            this.stepQueue.unshift(3);
                            if (this.mmu.getLowOrderByte() === 0xFF) {
                                this.mmu.setHighOrderByte(this.mmu.getHighOrderByte() + 0x1);
                                this.mmu.setLowOrderByte(0x00);
                            }
                            else {
                                this.mmu.setLowOrderByte(this.mmu.getLowOrderByte() + 0x1);
                            }
                        }
                        else {
                            this.stepQueue = [6];
                        }
                        break;
                    }
                }
            }
        }
    }

    writeBack() {
        this.mmu.write(this.accumulator);
    }

    interruptCheck() {
        let interrupt;
        if (this.intContr.queueSize() > 0) {
            interrupt = this.intContr.getNextInQueue();
            let buffer = interrupt.outputBuffer;
            while (buffer.length > 0) {
                process.stdout.write(buffer.shift());
            }
        }
    }

    //uses the opcode stored in the instruction register to determine the pipeline order
    //that will be used to fully complete the instruction. Also sets certain flags to be
    //used later for the execution cycles.
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
                this.noOperands = true;
                break;
            }
            case 0x98: {
                arr = [3, 6];
                this.noOperands = true;
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
                this.noOperands = true;
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
                this.noOperands = true;
                break;
            }
            case 0xEA: {
                arr = [3, 6];
                this.noOperands = true;
                break;
            }
            case 0x00: {
                arr = [3, 6];
                this.noOperands = true;
                break;
            }
            //cases beyond here are special cases with more specific functions
            case 0xEC: {
                arr = [1, 2, 3, 6];
                this.isAddr = true;
                break;
            }
            case 0xD0: {
                arr = [1, 3, 6];
                break;
            }
            case 0xEE: {
                arr = [1, 2, 3, 4, 5, 6];
                this.isAddr = true;
                break;
            }
            case 0xFF: {
                if (this.xReg === 0x01 || this.xReg === 0x02) {
                    arr = [3, 6];
                    this.noOperands = true;
                    break;
                } else if (this.xReg === 0x03) {
                    arr = [1, 2, 3, 6];
                    this.isAddr = true;
                    break;
                }
            }
        }
        return arr;
    }

    public getShutdownFlag() : boolean {
        return this.shutdownFlag;
    }

}