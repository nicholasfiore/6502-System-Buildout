import { listeners } from "process";
import { clearScreenDown } from "readline";
import { System } from "../System"
import { Hardware } from "./Hardware"
import { ClockListener } from "./imp/ClockListener"


export class Clock extends Hardware{
    //the listeners array is for storing all hardware that listens for a clock pulse
    private listeners: Array<ClockListener> = new Array<ClockListener>();

    constructor() {
        super();
        this.name = "Clk";
        this.id = 0;
    }

    public setCL(cl: ClockListener) {
        this.listeners.push(cl);
    }

    public sendPulse() {
        this.log("Clock Pulse Initialized")
        for (let i = 0; i <= listeners.length; i++) {
            this.listeners[i].pulse();
        }
    }
    
}