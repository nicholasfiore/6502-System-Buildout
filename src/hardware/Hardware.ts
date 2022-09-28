import { ClockListener } from "./imp/ClockListener"
/*
 * Hardware superclass for all hardware classes. Provides members for the name of the hardware, its ID, and a debug value
 * to help with testing. Also has a method used for logging the information about the hardware in console.
 */
export class Hardware {
    //member initialization
    public id: number;
    public name: string;
    public debug: boolean = true;

    //logs the name, id, time message to the console, passing a "created" message afterwards to confirm initialization
    public log(args: String) {
        if (this.debug === true)
            console.log("[HW - " + this.name + " id: " + this.id + " - " + Date.now() + "]: " + args);
    }

    //converts a decimal number to a hex string, with a total amount of digits depending on length.
    //Unused digits are padded by leading zeros.
    public hexLog(num: number, length: number) {
        return num.toString(16).padStart(length, '0').toUpperCase();
    }

}