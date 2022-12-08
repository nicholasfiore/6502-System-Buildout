import { Hardware } from "./Hardware"
import { Gates } from "./util/Gates";

export class Alu extends Hardware {
    //status flags that are output by the ALU, read by the CPU as a whole
    overflowFlag : boolean;
    zeroFlag : boolean;
    negativeFlag : boolean;

    // //private flag for checking if the full adder has a carry;
    // private carryFlag = false;

    constructor() {
        super();
        this.overflowFlag = false;
        this.zeroFlag = false;
        this.negativeFlag = false;
    }

    public addWithCarry() {

    }



    //half adder
    public halfAdder(bitA: boolean, bitB: boolean) {
        let sum = Gates.xor(bitA, bitB);
        let carry = Gates.and(bitA, bitB);
        return [sum, carry];
    }

    //full adder
    public fullAdder(inArr: boolean[], carryIn) {
        let bitA = inArr[0];
        let bitB = inArr[1];

        let halfAdder1 = this.halfAdder(bitA, bitB);
        let halfAdder2 = this.halfAdder(halfAdder1[0], carryIn);

        let carryOut : boolean;
        if (Gates.or(halfAdder1[1], halfAdder2[1])) {
            carryOut = true;
        }
        else {
            carryOut = false;
        }
        return [halfAdder2[0], carryOut]; //returns the total bit sum and carry out value
    }

    //this is what performs addition with 8 bits. returns the value output.
    public eightBitAdder(byteA: number, byteB: number, carryIn) {
        let fullAdderArr : boolean[] = [8];
        if (carryIn) {
            fullAdderArr[0] = this.fullAdder()[0];
        }
        for (let num of fullAdderArr) {
            
        }
    }
}

/*
who doesn't like some ascii art?

   input A            input B
____________        ____________
\           \      /           /
 \           \    /           /
  \           \  /           /
   \           \/           /
    \                      /
     \                    /
      \                  /
       \________________/
             output
*/