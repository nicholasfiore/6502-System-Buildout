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
    public fullAdder(bitA: boolean, bitB: boolean, carryIn) {
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
    public eightBitAdder(byteA: number, byteB: number, carryIn: boolean) {
        let byteAArr = this.byteToArray(byteA);
        let byteBArr = this.byteToArray(byteB);
        let result = [];
        let carry = carryIn;
        for (let i = 0; i < 8; i++) {
            let fullAdderReturn = this.fullAdder(byteAArr[i], byteBArr[i], carry)
            carry = fullAdderReturn[1];
            result[i] = fullAdderReturn[0];
        }
        if (carry)
            this.overflowFlag = true;
        return result;
    }

    public byteToArray(byte: number) : boolean[] {
        let byteStr = byte.toString(2);
        let retArr = [];
        for (let i = 0; i < byteStr.length; i++) {
            if (byteStr[i] === '1')
                retArr[i] = true;
            else if (byteStr[i] === '0')
                retArr[i] = false;
        }
        return retArr;
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