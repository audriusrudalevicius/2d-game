import {PositionInterface} from "../../shared/Entities";

export class Position implements PositionInterface {
    public x: number;
    public y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}
