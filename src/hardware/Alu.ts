import { Hardware } from "./Hardware"
import { Gates } from "./util/Gates";

export class Alu extends Hardware {
    //status flags that are output by the ALU, read by the CPU as a whole
    overflowFlag : boolean;
    zeroFlag : boolean;
    negativeFlag : boolean;

    //private flag used only internally by the ALU
    private accNeg = false;
    private readNeg = false;

    constructor() {
        super();
        this.overflowFlag = false;
        this.zeroFlag = false;
        this.negativeFlag = false;
    }

    public addWithCarry(accumulator: number, readVal: number) {
        this.negativeFlag = false; //reset negative flag
        if ((Math.abs(accumulator - 0xFF) > readVal && accumulator > 0x7F) || (Math.abs(readVal - 0xFF) > accumulator && readVal > 0x7F) || (accumulator > 0x7F && readVal > 0x7F)) {
            this.negativeFlag = true;
        }
        let retVal = this.eightBitAdder(accumulator, readVal, this.overflowFlag);
        if (retVal > 0xFF && !this.overflowFlag) {
            retVal = retVal - 0xFF;
        }
        return retVal;
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
        let resultArr = [];
        let carry = carryIn;
        for (let i = 8; i > 0; i--) {
            let fullAdderReturn = this.fullAdder(byteAArr[i], byteBArr[i], carry)
            carry = fullAdderReturn[1];
            resultArr[i] = fullAdderReturn[0];
        }
        if (carry) {
            this.overflowFlag = true;
        }


        //converts boolean representation of bits back into a number value
        let tempArr = [];
        for (let i = resultArr.length - 1; i >= 0; i--) {
            if (resultArr[i]) {
                tempArr[i] = '1';
            } else {
                tempArr[i] = '0';
            }
        }
        let resultStr;
        if (this.negativeFlag) {
            resultStr = '1' + tempArr[1] + tempArr[2] + tempArr[3] + tempArr[4] + tempArr[5] + tempArr[6] + tempArr[7];
        } else {
            resultStr = tempArr[0] + tempArr[1] + tempArr[2] + tempArr[3] + tempArr[4] + tempArr[5] + tempArr[6] + tempArr[7];
        }
        let result = parseInt(resultStr, 2);
        return result;
    }

    public byteToArray(byte: number) : boolean[] {
        let byteStr = byte.toString(2).padStart(8, '0');
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