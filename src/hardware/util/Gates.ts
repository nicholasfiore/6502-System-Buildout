/* 
An abstraction of logic gates into methods for use in certain operations (such as the ALU)
*/
export class Gates {

    //basic gates. These gates are used to build all other gates.
    public static and(inputA: boolean, inputB: boolean) {
        if (inputA && inputB) 
            return true;
        else
            return false;
    }

    public static or(inputA: boolean, inputB: boolean) {
        if (inputA || inputB)
            return true;
        else
            return false;
    }

    public static not(input: boolean) {
        return !input;
    }

    //inverse gates (NAND, Nor)
    public static nand(inputA: boolean, inputB: boolean) {
        let retVal = this.not(this.and(inputA, inputB));
        return retVal;
    }

    public static nor(inputA: boolean, inputB: boolean) {
        let retVal = this.not(this.and(inputA, inputB));
        return retVal;
    }

    //special gates
    public static xor(inputA, inputB) {
        let orRes = this.or(inputA, inputB);
        let nandRes = this.nand(inputA, inputB);
        let andRes = this.and(orRes, nandRes);
        return andRes;
    }
}