export class Ascii {
    /*
     * A utility class used to encode and decode bytes as ASCII characters
     */


    public static toAscii(byte : number) : String{
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
                        retChar = ' ';
                        break;
                    }
                    case 0b0001: {
                        retChar = '!';
                        break;
                    }
                    case 0b0010: {
                        retChar = '\"';
                        break;
                    }
                    case 0b0011: {
                        retChar = '#';
                        break;
                    }
                    case 0b0100: {
                        retChar = '$';
                        break;
                    }
                    case 0b0101: {
                        retChar = '%';
                        break;
                    }
                    case 0b0110: {
                        retChar = '&';
                        break;
                    }
                    case 0b0111: {
                        retChar = '\'';
                        break;
                    }
                    case 0b1000: {
                        retChar = '(';
                        break;
                    }
                    case 0b1001: {
                        retChar = ')';
                        break;
                    }
                    case 0b1010: {
                        retChar = '*';
                        break;
                    }
                    case 0b1011: {
                        retChar = '+';
                        break;
                    }
                    case 0b1100: {
                        retChar = ',';
                        break;
                    }
                    case 0b1101: {
                        retChar = '-';
                        break;
                    }
                    case 0b1110: {
                        retChar = '.';
                        break;
                    }
                    case 0b1111: {
                        retChar = "/";
                        break;
                    }
                }
            }
            case 0b0011: {
                switch (bottom) { //this switch statement determines the row being used
                    case 0b0000: {
                        retChar = '0';
                        break;
                    }
                    case 0b0001: {
                        retChar = '1';
                        break;
                    }
                    case 0b0010: {
                        retChar = '2';
                        break;
                    }
                    case 0b0011: {
                        retChar = '3';
                        break;
                    }
                    case 0b0100: {
                        retChar = '4';
                        break;
                    }
                    case 0b0101: {
                        retChar = '5';
                        break;
                    }
                    case 0b0110: {
                        retChar = '6';
                        break;
                    }
                    case 0b0111: {
                        retChar = '7';
                        break;
                    }
                    case 0b1000: {
                        retChar = '8';
                        break;
                    }
                    case 0b1001: {
                        retChar = '9';
                        break;
                    }
                    case 0b1010: {
                        retChar = ':';
                        break;
                    }
                    case 0b1011: {
                        retChar = ';';
                        break;
                    }
                    case 0b1100: {
                        retChar = '<';
                        break;
                    }
                    case 0b1101: {
                        retChar = '=';
                        break;
                    }
                    case 0b1110: {
                        retChar = '>';
                        break;
                    }
                    case 0b1111: {
                        retChar = '?';
                        break;
                    }
                }
            }
            case 0b0100: {
                switch (bottom) { //this switch statement determines the row being used
                    case 0b0000: {
                        retChar = '@';
                        break;
                    }
                    case 0b0001: {
                        retChar = 'A';
                        break;
                    }
                    case 0b0010: {
                        retChar = 'B';
                        break;
                    }
                    case 0b0011: {
                        retChar = 'C';
                        break;
                    }
                    case 0b0100: {
                        retChar = 'D';
                        break;
                    }
                    case 0b0101: {
                        retChar = 'E';
                        break;
                    }
                    case 0b0110: {
                        retChar = 'F';
                        break;
                    }
                    case 0b0111: {
                        retChar = 'G';
                        break;
                    }
                    case 0b1000: {
                        retChar = 'H';
                        break;
                    }
                    case 0b1001: {
                        retChar = 'I';
                        break;
                    }
                    case 0b1010: {
                        retChar = 'J';
                        break;
                    }
                    case 0b1011: {
                        retChar = 'K';
                        break;
                    }
                    case 0b1100: {
                        retChar = 'L';
                        break;
                    }
                    case 0b1101: {
                        retChar = 'M';
                        break;
                    }
                    case 0b1110: {
                        retChar = 'N';
                        break;
                    }
                    case 0b1111: {
                        retChar = 'O';
                        break;
                    }
                }
            }
            case 0b0101: {
                switch (bottom) { //this switch statement determines the row being used
                    case 0b0000: {
                        retChar = 'P';
                        break;
                    }
                    case 0b0001: {
                        retChar = 'Q';
                        break;
                    }
                    case 0b0010: {
                        retChar = 'R';
                        break;
                    }
                    case 0b0011: {
                        retChar = 'S';
                        break;
                    }
                    case 0b0100: {
                        retChar = 'T';
                        break;
                    }
                    case 0b0101: {
                        retChar = 'U';
                        break;
                    }
                    case 0b0110: {
                        retChar = 'V';
                        break;
                    }
                    case 0b0111: {
                        retChar = 'W';
                        break;
                    }
                    case 0b1000: {
                        retChar = 'X';
                        break;
                    }
                    case 0b1001: {
                        retChar = 'Y';
                        break;
                    }
                    case 0b1010: {
                        retChar = 'Z';
                        break;
                    }
                    case 0b1011: {
                        retChar = '[';
                        break;
                    }
                    case 0b1100: {
                        retChar = '\\';
                        break;
                    }
                    case 0b1101: {
                        retChar = ']';
                        break;
                    }
                    case 0b1110: {
                        retChar = '^';
                        break;
                    }
                    case 0b1111: {
                        retChar = '_';
                        break;
                    }
                }
            }
            case 0b0110: {
                switch (bottom) { //this switch statement determines the row being used
                    case 0b0000: {
                        retChar = '`';
                        break;
                    }
                    case 0b0001: {
                        retChar = 'a';
                        break;
                    }
                    case 0b0010: {
                        retChar = 'b';
                        break;
                    }
                    case 0b0011: {
                        retChar = 'c';
                        break;
                    }
                    case 0b0100: {
                        retChar = 'd';
                        break;
                    }
                    case 0b0101: {
                        retChar = 'e';
                        break;
                    }
                    case 0b0110: {
                        retChar = 'f';
                        break;
                    }
                    case 0b0111: {
                        retChar = 'g';
                        break;
                    }
                    case 0b1000: {
                        retChar = 'h';
                        break;
                    }
                    case 0b1001: {
                        retChar = 'i';
                        break;
                    }
                    case 0b1010: {
                        retChar = 'j';
                        break;
                    }
                    case 0b1011: {
                        retChar = 'k';
                        break;
                    }
                    case 0b1100: {
                        retChar = 'l';
                        break;
                    }
                    case 0b1101: {
                        retChar = 'm';
                        break;
                    }
                    case 0b1110: {
                        retChar = 'n';
                        break;
                    }
                    case 0b1111: {
                        retChar = 'o';
                        break;
                    }
                }
            }
            case 0b0111: {
                switch (bottom) { //this switch statement determines the row being used
                    case 0b0000: {
                        retChar = 'p';
                        break;
                    }
                    case 0b0001: {
                        retChar = 'q';
                        break;
                    }
                    case 0b0010: {
                        retChar = 'r';
                        break;
                    }
                    case 0b0011: {
                        retChar = 's';
                        break;
                    }
                    case 0b0100: {
                        retChar = 't';
                        break;
                    }
                    case 0b0101: {
                        retChar = 'u';
                        break;
                    }
                    case 0b0110: {
                        retChar = 'v';
                        break;
                    }
                    case 0b0111: {
                        retChar = 'w';
                        break;
                    }
                    case 0b1000: {
                        retChar = 'x';
                        break;
                    }
                    case 0b1001: {
                        retChar = 'y';
                        break;
                    }
                    case 0b1010: {
                        retChar = 'z';
                        break;
                    }
                    case 0b1011: {
                        retChar = '{';
                        break;
                    }
                    case 0b1100: {
                        retChar = '|';
                        break;
                    }
                    case 0b1101: {
                        retChar = '}';
                        break;
                    }
                    case 0b1110: {
                        retChar = '~';
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