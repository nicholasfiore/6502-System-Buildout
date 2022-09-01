//imports for hardware
import {Cpu} from "./Cpu";

export class Hardware {
    public id: number;
    public name: string;
    public debug: boolean = true;

    public dateTime: Date = new Date();

    /**
     * logs the name, id, time message to the console, passing a "created" message afterwards to confirm initialization
     */
    public log() {
        if (this.debug === true)
            console.log("[HW - " + this.name + " id: " + this.id + " - " + Date.now() + "]: created");
    }
}