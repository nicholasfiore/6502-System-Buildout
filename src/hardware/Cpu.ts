//imports
import {System} from "../System";
import {Hardware} from "./Hardware";

export class Cpu extends Hardware {
    constructor() {
        super();
        this.name = "Cpu";
        this.id = 0;
    }
}
