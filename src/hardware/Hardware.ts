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
    public log() {
        if (this.debug === true)
            console.log("[HW - " + this.name + " id: " + this.id + " - " + Date.now() + "]: created");
    }

    public hexLog(num: number) {
        num.toString(16).toUpperCase();
    }

}