export class BlockColor {

    name: string;
    value: string = '';
    color: string;

    constructor(name: string, value: string, color: string) {
        this.name = name;
        this.value = value;
        this.color = color;
    }

}

export const EMPTY:   BlockColor = new BlockColor('Empty','0','transparent');
export const RED:     BlockColor = new BlockColor('Red','1','rgb(255,0,0)');
export const GREEN:   BlockColor = new BlockColor('Green','2','rgb(0,255,0)');
export const BLUE:    BlockColor = new BlockColor('Blue','3','rgb(0,77,255)');
export const BLACK:   BlockColor = new BlockColor('Black','4','rgb(0,0,0)');
export const WHITE:   BlockColor = new BlockColor('White','5','rgb(255,255,255)');
export const YELLOW:  BlockColor = new BlockColor('Yellow','6','rgb(254,198,0)');
export const BROWN:   BlockColor = new BlockColor('Brown','7','rgb(157,67,44)');
export const MARBLE:  BlockColor = new BlockColor('Marble','8','rgb(215,212,212)');
export const NEBULAE: BlockColor = new BlockColor('Nebulae','9','rgb(66,67,121)');
export const BLOCKED: BlockColor = new BlockColor('Blocked','X','rgb(255,0,255)');
export const UNKNOWN: BlockColor = new BlockColor('Unknown','?','rgb(180,180,180)');

export const getBlockColor = function(encodeValue: string): BlockColor {
    switch (encodeValue) {
        case '0': return EMPTY;
        case '1': return RED;
        case '2': return GREEN;
        case '3': return BLUE;
        case '4': return BLACK;
        case '5': return WHITE;
        case '6': return YELLOW;
        case '7': return BROWN;
        case '8': return MARBLE;
        case '9': return NEBULAE;
        case 'X': return BLOCKED;
        case '?': return UNKNOWN;
        default: return UNKNOWN;
    }
}
