export class Ascii {
    /*
     * A utility class used to encode and decode bytes as ASCII characters
     */


    public static toAscii(byte : number) : String{
        let top = Math.floor(byte / 0x10); //top half of the byte
        let bottom = byte % 0x10; //bottom half of the byte
        let retChar : String;

        switch (top){ //this switch statement determines the column being used
            case 0x0: {
                switch (bottom) { //this switch statement determines the row being used
                    case 0x0: {
                        retChar = '\0';
                        break;
                    }
                    case 0x1: {
                        break;
                    }
                    case 0x2: {
                        break;
                    }
                    case 0x3: {
                        break;
                    }
                    case 0x4: {
                        break;
                    }
                    case 0x5: {
                        break;
                    }
                    case 0x6: {
                        break;
                    }
                    case 0x7: {
                        break;
                    }
                    case 0x8: {
                        retChar = '\b';
                        break;
                    }
                    case 0x9: {
                        retChar = '\t';
                        break;
                    }
                    case 0xA: {
                        retChar = '\n';
                        break;
                    }
                    case 0xB: {
                        retChar = '\v';
                        break;
                    }
                    case 0xC: {
                        retChar = '\f';
                        break;
                    }
                    case 0xD: {
                        retChar = '\r';
                        break;
                    }
                    case 0xE: {
                        break;
                    }
                    case 0xF: {
                        break;
                    }
                }
                break;
            }
            case 0x1: {
                switch (bottom) { //this switch statement determines the row being used
                    case 0x0: {
                        break;
                    }
                    case 0x1: {
                        break;
                    }
                    case 0x2: {
                        break;
                    }
                    case 0x3: {
                        break;
                    }
                    case 0x4: {
                        break;
                    }
                    case 0x5: {
                        break;
                    }
                    case 0x6: {
                        break;
                    }
                    case 0x7: {
                        break;
                    }
                    case 0x8: {
                        break;
                    }
                    case 0x9: {
                        break;
                    }
                    case 0xA: {
                        break;
                    }
                    case 0xB: {
                        break;
                    }
                    case 0xC: {
                        break;
                    }
                    case 0xD: {
                        break;
                    }
                    case 0xE: {
                        break;
                    }
                    case 0xF: {
                        break;
                    }
                }
                break;
            }
            case 0x2: {
                switch (bottom) { //this switch statement determines the row being used
                    case 0x0: {
                        retChar = ' ';
                        break;
                    }
                    case 0x1: {
                        retChar = '!';
                        break;
                    }
                    case 0x2: {
                        retChar = '\"';
                        break;
                    }
                    case 0x3: {
                        retChar = '#';
                        break;
                    }
                    case 0x4: {
                        retChar = '$';
                        break;
                    }
                    case 0x5: {
                        retChar = '%';
                        break;
                    }
                    case 0x6: {
                        retChar = '&';
                        break;
                    }
                    case 0x7: {
                        retChar = '\'';
                        break;
                    }
                    case 0x8: {
                        retChar = '(';
                        break;
                    }
                    case 0x9: {
                        retChar = ')';
                        break;
                    }
                    case 0xA: {
                        retChar = '*';
                        break;
                    }
                    case 0xB: {
                        retChar = '+';
                        break;
                    }
                    case 0xC: {
                        retChar = ',';
                        break;
                    }
                    case 0xD: {
                        retChar = '-';
                        break;
                    }
                    case 0xE: {
                        retChar = '.';
                        break;
                    }
                    case 0xF: {
                        retChar = "/";
                        break;
                    }
                }
                break;
            }
            case 0x3: {
                switch (bottom) { //this switch statement determines the row being used
                    case 0x0: {
                        retChar = '0';
                        break;
                    }
                    case 0x1: {
                        retChar = '1';
                        break;
                    }
                    case 0x2: {
                        retChar = '2';
                        break;
                    }
                    case 0x3: {
                        retChar = '3';
                        break;
                    }
                    case 0x4: {
                        retChar = '4';
                        break;
                    }
                    case 0x5: {
                        retChar = '5';
                        break;
                    }
                    case 0x6: {
                        retChar = '6';
                        break;
                    }
                    case 0x7: {
                        retChar = '7';
                        break;
                    }
                    case 0x8: {
                        retChar = '8';
                        break;
                    }
                    case 0x9: {
                        retChar = '9';
                        break;
                    }
                    case 0xA: {
                        retChar = ':';
                        break;
                    }
                    case 0xB: {
                        retChar = ';';
                        break;
                    }
                    case 0xC: {
                        retChar = '<';
                        break;
                    }
                    case 0xD: {
                        retChar = '=';
                        break;
                    }
                    case 0xE: {
                        retChar = '>';
                        break;
                    }
                    case 0xF: {
                        retChar = '?';
                        break;
                    }
                }
                break;
            }
            case 0x4: {
                switch (bottom) { //this switch statement determines the row being used
                    case 0x0: {
                        retChar = '@';
                        break;
                    }
                    case 0x1: {
                        retChar = 'A';
                        break;
                    }
                    case 0x2: {
                        retChar = 'B';
                        break;
                    }
                    case 0x3: {
                        retChar = 'C';
                        break;
                    }
                    case 0x4: {
                        retChar = 'D';
                        break;
                    }
                    case 0x5: {
                        retChar = 'E';
                        break;
                    }
                    case 0x6: {
                        retChar = 'F';
                        break;
                    }
                    case 0x7: {
                        retChar = 'G';
                        break;
                    }
                    case 0x8: {
                        retChar = 'H';
                        break;
                    }
                    case 0x9: {
                        retChar = 'I';
                        break;
                    }
                    case 0xA: {
                        retChar = 'J';
                        break;
                    }
                    case 0xB: {
                        retChar = 'K';
                        break;
                    }
                    case 0xC: {
                        retChar = 'L';
                        break;
                    }
                    case 0xD: {
                        retChar = 'M';
                        break;
                    }
                    case 0xE: {
                        retChar = 'N';
                        break;
                    }
                    case 0xF: {
                        retChar = 'O';
                        break;
                    }
                }
                break;
            }
            case 0x5: {
                switch (bottom) { //this switch statement determines the row being used
                    case 0x0: {
                        retChar = 'P';
                        break;
                    }
                    case 0x1: {
                        retChar = 'Q';
                        break;
                    }
                    case 0x2: {
                        retChar = 'R';
                        break;
                    }
                    case 0x3: {
                        retChar = 'S';
                        break;
                    }
                    case 0x4: {
                        retChar = 'T';
                        break;
                    }
                    case 0x5: {
                        retChar = 'U';
                        break;
                    }
                    case 0x6: {
                        retChar = 'V';
                        break;
                    }
                    case 0x7: {
                        retChar = 'W';
                        break;
                    }
                    case 0x8: {
                        retChar = 'X';
                        break;
                    }
                    case 0x9: {
                        retChar = 'Y';
                        break;
                    }
                    case 0xA: {
                        retChar = 'Z';
                        break;
                    }
                    case 0xB: {
                        retChar = '[';
                        break;
                    }
                    case 0xC: {
                        retChar = '\\';
                        break;
                    }
                    case 0xD: {
                        retChar = ']';
                        break;
                    }
                    case 0xE: {
                        retChar = '^';
                        break;
                    }
                    case 0xF: {
                        retChar = '_';
                        break;
                    }
                }
                break;
            }
            case 0x6: {
                switch (bottom) { //this switch statement determines the row being used
                    case 0x0: {
                        retChar = '`';
                        break;
                    }
                    case 0x1: {
                        retChar = 'a';
                        break;
                    }
                    case 0x2: {
                        retChar = 'b';
                        break;
                    }
                    case 0x3: {
                        retChar = 'c';
                        break;
                    }
                    case 0x4: {
                        retChar = 'd';
                        break;
                    }
                    case 0x5: {
                        retChar = 'e';
                        break;
                    }
                    case 0x6: {
                        retChar = 'f';
                        break;
                    }
                    case 0x7: {
                        retChar = 'g';
                        break;
                    }
                    case 0x8: {
                        retChar = 'h';
                        break;
                    }
                    case 0x9: {
                        retChar = 'i';
                        break;
                    }
                    case 0xA: {
                        retChar = 'j';
                        break;
                    }
                    case 0xB: {
                        retChar = 'k';
                        break;
                    }
                    case 0xC: {
                        retChar = 'l';
                        break;
                    }
                    case 0xD: {
                        retChar = 'm';
                        break;
                    }
                    case 0xE: {
                        retChar = 'n';
                        break;
                    }
                    case 0xF: {
                        retChar = 'o';
                        break;
                    }
                }
                break;
            }
            case 0x7: {
                switch (bottom) { //this switch statement determines the row being used
                    case 0x0: {
                        retChar = 'p';
                        break;
                    }
                    case 0x1: {
                        retChar = 'q';
                        break;
                    }
                    case 0x2: {
                        retChar = 'r';
                        break;
                    }
                    case 0x3: {
                        retChar = 's';
                        break;
                    }
                    case 0x4: {
                        retChar = 't';
                        break;
                    }
                    case 0x5: {
                        retChar = 'u';
                        break;
                    }
                    case 0x6: {
                        retChar = 'v';
                        break;
                    }
                    case 0x7: {
                        retChar = 'w';
                        break;
                    }
                    case 0x8: {
                        retChar = 'x';
                        break;
                    }
                    case 0x9: {
                        retChar = 'y';
                        break;
                    }
                    case 0xA: {
                        retChar = 'z';
                        break;
                    }
                    case 0xB: {
                        retChar = '{';
                        break;
                    }
                    case 0xC: {
                        retChar = '|';
                        break;
                    }
                    case 0xD: {
                        retChar = '}';
                        break;
                    }
                    case 0xE: {
                        retChar = '~';
                        break;
                    }
                    case 0xF: {
                        break;
                    }
                }
                break;
            }
        }
        return retChar;
    }
    
    public static toBinary(character : String) {
        let retVal : number;
        switch (character){
            case "\0": {

            }
        }
    }
}