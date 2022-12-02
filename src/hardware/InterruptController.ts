import { Hardware } from "./Hardware";
import { Interrupt } from "./imp/Interrupt";

export class InterruptController extends Hardware {
    //current interrupt queue, which will be fed into the CPU
    private interruptQueue : [];
    //a list of all hardware objects that implement hardware
    private connectedHardware : Array<Interrupt> = new Array<Interrupt>();

    constructor() {
        super();
        this.interruptQueue = [];
    }

    acceptInterrupt(device : any) {
        for(let i = 0; i < this.interruptQueue.length; i++) {
            if (this.interruptQueue[i].getPriority() < device.getPriority())
        }
    }
}