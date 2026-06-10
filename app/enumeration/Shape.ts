import * as Block from "@/app/enumeration/BlockColor";
import {BlockColor} from "@/app/enumeration/BlockColor";

export class Shape {

    shape: BlockColor[][];
    rotations: number;
    flip: boolean;

    constructor(shape: BlockColor[][], rotations: number, flip: boolean) {
        this.shape = shape;
        this.rotations = rotations;
        this.flip = flip;
    }

}

export const SHAPE_RED: Shape = new Shape([
    [Block.RED,Block.RED,Block.RED],
    [Block.RED,Block.EMPTY,Block.EMPTY],
    [Block.RED,Block.EMPTY,Block.EMPTY],
    ],4,false);

export const SHAPE_GREEN: Shape = new Shape([
        [Block.GREEN,Block.GREEN,Block.GREEN,Block.GREEN],
        [Block.EMPTY,Block.GREEN,Block.EMPTY,Block.EMPTY],
    ],4,true);

export const SHAPE_BLUE: Shape = new Shape([
        [Block.BLUE,Block.BLUE,Block.BLUE,Block.BLUE],
        [Block.BLUE,Block.EMPTY,Block.EMPTY,Block.EMPTY],
    ],4,true);

export const SHAPE_BLACK: Shape = new Shape([
        [Block.BLACK,Block.BLACK,Block.EMPTY],
        [Block.BLACK,Block.BLACK,Block.EMPTY],
        [Block.EMPTY,Block.BLACK,Block.BLACK],
    ],4,true);

export const SHAPE_WHITE: Shape = new Shape([
        [Block.WHITE,Block.WHITE,Block.WHITE],
        [Block.WHITE,Block.WHITE,Block.EMPTY],
    ],4,true);

export const SHAPE_YELLOW: Shape = new Shape([
        [Block.YELLOW,Block.YELLOW,Block.YELLOW],
        [Block.YELLOW,Block.YELLOW,Block.YELLOW],
    ],2,false);

export const SHAPE_BROWN: Shape = new Shape([
        [Block.BROWN,Block.BROWN,Block.BROWN,Block.EMPTY],
        [Block.EMPTY,Block.EMPTY,Block.BROWN,Block.BROWN],
    ],4,true);

export const SHAPE_MARBLE: Shape = new Shape([
        [Block.MARBLE,Block.MARBLE,Block.MARBLE],
        [Block.MARBLE,Block.EMPTY,Block.MARBLE],
    ],4,false);

export const SHAPE_NEBULAE: Shape = new Shape([
        [Block.NEBULAE,Block.NEBULAE,Block.EMPTY],
        [Block.EMPTY,Block.NEBULAE,Block.EMPTY],
        [Block.EMPTY,Block.NEBULAE,Block.NEBULAE],
    ],2,true);


export default Shape;