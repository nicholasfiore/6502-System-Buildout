import { Hardware } from "./Hardware";
import { Interrupt } from "./imp/Interrupt";
import { InterruptController } from "./InterruptController";

export class Keyboard extends Hardware implements Interrupt {
    irq : number;
    priority : number;
    intName : String;
    outputBuffer = [];
    interruptCon : InterruptController

    constructor(ic : InterruptController) {
        super();
        this.interruptCon = ic;
        this.interruptCon.addDevice(this);
        this.name = "Keyboard";
        this.intName = "DS/2 KB"
        this.irq = 1;
        this.priority = 3;
    }
    
    private monitorKeys() {
        /*
        character stream from stdin code (most of the contents of this function) taken from here
        https://stackoverflow.com/questions/5006821/nodejs-how-to-read-keystrokes-from-stdin

        This takes care of the simulation we need to do to capture stdin from the console and retrieve the character.
        Then we can put it in the buffer and trigger the interrupt.
         */
        var stdin = process.stdin;

        // without this, we would only get streams once enter is pressed
        stdin.setRawMode( true );

        // resume stdin in the parent process (node app won't quit all by itself
        // unless an error or process.exit() happens)
        stdin.resume();

        // i don't want binary, do you?
        stdin.setEncoding( 'utf8' );
        //stdin.setEncoding(null);


        stdin.on( 'data', function( key ){
            //let keyPressed : String = key.charCodeAt(0).toString(2);
            //while(keyPressed.length < 8) keyPressed = "0" + keyPressed;
            let keyPressed: String = key.toString();

            this.log("Key pressed - " + keyPressed);

            // ctrl-c ( end of text )
            // this let's us break out with ctrl-c
            if ( key.toString() === '\u0003' ) {
                process.exit();
            }

            // write the key to stdout all normal like
            //process.stdout.write( key);
            // put the key value in the buffer
            this.outputBuffer.push(keyPressed);

            // set the interrupt!
            this.interruptCon.acceptInterrupt(this);

            // .bind(this) is required when running an asynchronous process in node that wishes to reference an
            // instance of an object.
        }.bind(this));
    }

    getPriority() {
        return this.priority;
    }
}