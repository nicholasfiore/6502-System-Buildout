import { listeners } from "process";
import { clearScreenDown } from "readline";
import { System } from "../System"
import { Hardware } from "./Hardware"
import { ClockListener } from "./imp/ClockListener"

/*
* The Clock class represents the physical clock within the System. The Clock
* keeps track of all parts of the system that listen for a clock pulse, and
* handles initializing the pulses for said parts.
*/
export class Clock extends Hardware{
    //the listeners array is for storing all hardware that listens for a clock pulse
    private listeners: Array<ClockListener> = new Array<ClockListener>();

    constructor() {
        super();
        this.name = "Clk";
        this.id = 0;
    }

    //allows an outside class to add new parts to the listeners array
    public setCL(cl: ClockListener) {
        this.listeners.push(cl);
    }

    //sends out a pulse by calling the pulse() method for every object in
    //the listeners array
    public sendPulse() {
        this.log("Clock Pulse Initialized")
        for (let i = 0; i <= listeners.length; i++) {
            this.listeners[i].pulse();
        }
    }  
}