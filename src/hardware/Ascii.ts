export class Ascii {
    /*
     * A utility class used to encode and decode bytes as ASCII characters
     */


    public static toAscii(byte : number) {
        let top = byte / 0x10; //top half of the byte
        let bottom = byte % 0x10; //bottom half of the byte
        let retChar : String;

        switch (top){ //this switch statement determines the column being used
            case 0b0000: {
                switch (bottom) { //this switch statement determines the row being used
                    case 0b0000: {
                        retChar = '\0';
                        break;
                    }
                    case 0b0001: {
                        break;
                    }
                    case 0b0010: {
                        break;
                    }
                    case 0b0011: {
                        break;
                    }
                    case 0b0100: {
                        break;
                    }
                    case 0b0101: {
                        break;
                    }
                    case 0b0110: {
                        break;
                    }
                    case 0b0111: {
                        break;
                    }
                    case 0b1000: {
                        retChar = '\b';
                        break;
                    }
                    case 0b1001: {
                        retChar = '\t';
                        break;
                    }
                    case 0b1010: {
                        retChar = '\n';
                        break;
                    }
                    case 0b1011: {
                        retChar = '\v';
                        break;
                    }
                    case 0b1100: {
                        retChar = '\f';
                        break;
                    }
                    case 0b1101: {
                        retChar = '\r';
                        break;
                    }
                    case 0b1110: {
                        break;
                    }
                    case 0b1111: {
                        break;
                    }
                }
            }
            case 0b0001: {
                switch (bottom) { //this switch statement determines the row being used
                    case 0b0000: {
                        break;
                    }
                    case 0b0001: {
                        break;
                    }
                    case 0b0010: {
                        break;
                    }
                    case 0b0011: {
                        break;
                    }
                    case 0b0100: {
                        break;
                    }
                    case 0b0101: {
                        break;
                    }
                    case 0b0110: {
                        break;
                    }
                    case 0b0111: {
                        break;
                    }
                    case 0b1000: {
                        break;
                    }
                    case 0b1001: {
                        break;
                    }
                    case 0b1010: {
                        break;
                    }
                    case 0b1011: {
                        break;
                    }
                    case 0b1100: {
                        break;
                    }
                    case 0b1101: {
                        break;
                    }
                    case 0b1110: {
                        break;
                    }
                    case 0b1111: {
                        break;
                    }
                }
            }
            case 0b0010: {
                switch (bottom) { //this switch statement determines the row being used
                    case 0b0000: {
                        break;
                    }
                    case 0b0001: {
                        break;
                    }
                    case 0b0010: {
                        break;
                    }
                    case 0b0011: {
                        break;
                    }
                    case 0b0100: {
                        break;
                    }
                    case 0b0101: {
                        break;
                    }
                    case 0b0110: {
                        break;
                    }
                    case 0b0111: {
                        break;
                    }
                    case 0b1000: {
                        break;
                    }
                    case 0b1001: {
                        break;
                    }
                    case 0b1010: {
                        break;
                    }
                    case 0b1011: {
                        break;
                    }
                    case 0b1100: {
                        break;
                    }
                    case 0b1101: {
                        break;
                    }
                    case 0b1110: {
                        break;
                    }
                    case 0b1111: {
                        break;
                    }
                }
            }
            case 0b0011: {
                switch (bottom) { //this switch statement determines the row being used
                    case 0b0000: {
                        break;
                    }
                    case 0b0001: {
                        break;
                    }
                    case 0b0010: {
                        break;
                    }
                    case 0b0011: {
                        break;
                    }
                    case 0b0100: {
                        break;
                    }
                    case 0b0101: {
                        break;
                    }
                    case 0b0110: {
                        break;
                    }
                    case 0b0111: {
                        break;
                    }
                    case 0b1000: {
                        break;
                    }
                    case 0b1001: {
                        break;
                    }
                    case 0b1010: {
                        break;
                    }
                    case 0b1011: {
                        break;
                    }
                    case 0b1100: {
                        break;
                    }
                    case 0b1101: {
                        break;
                    }
                    case 0b1110: {
                        break;
                    }
                    case 0b1111: {
                        break;
                    }
                }
            }
        }
        return retChar;
    }
    
    public static toBinary() {

    }
}