import { Hardware } from "./Hardware";
import { Interrupt } from "./imp/Interrupt";

export class InterruptController extends Hardware {
    //current interrupt queue, which will be fed into the CPU
    private interruptQueue = [];
    //a list of all hardware objects that implement hardware
    private connectedHardware : Array<Interrupt> = new Array<Interrupt>();

    constructor() {
        super();
    }

    acceptInterrupt(device : Interrupt) {
        if (this.interruptQueue.length > 0) {
            for(let e of this.interruptQueue) {
                if (e.priority < device.priority) {
                    this.interruptQueue.splice(this.interruptQueue.indexOf(e), 0, device);
                }
            }
        } else {
            this.interruptQueue.push(device);
        }
    }

    public addDevice(device : Interrupt) {
        this.connectedHardware.push(device);
    }

    public queueSize() {
        return this.interruptQueue.length;
    }

    public getNextInQueue() { //returns the interrupt at the beginning of the array
        let retVal = this.interruptQueue.shift();
        return retVal;
    }
}