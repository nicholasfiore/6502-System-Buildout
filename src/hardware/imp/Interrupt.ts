export interface Interrupt {
    irq : number;
    priority : number;
    name : String;
    inputBuffer? : []; //the ? denotes an optional property, since not every class implementing 
    outputBuffer? : []; //Interrupt recives inputs, or likewise outputs data
}