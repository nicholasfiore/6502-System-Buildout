import { System } from "../System"
import { Hardware } from "./Hardware"
import { ClockListener } from "./imp/ClockListener"


export class Clock extends Hardware {
    //the listeners array is for storing all hardware that listens for a clock pulse

    constructor() {
        super();
        this.name = "Clk";
        this.id = 0;
    }

    //adds an object to the array
    push() {

    }
}

