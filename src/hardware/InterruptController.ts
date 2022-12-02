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

    acceptInterrupt(device : any) {
        if (this.interruptQueue.length > 0) {
            for(let e of this.interruptQueue) {
                if (e.getPriority() < device.getPriority()) {
                    this.interruptQueue.splice(this.interruptQueue.indexOf(e), 0, device);
                }
            }
        } else {
            this.interruptQueue.push(device);
        }
    }
}