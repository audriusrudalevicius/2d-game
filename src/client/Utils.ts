import {BLOCK_SIZE_H, BLOCK_SIZE_W} from "./Constants";
import {Direction} from "../shared/Direction";
import {KEY} from "../shared/Keys";

export const WorldToCanvas = (x: number, y: number) => {
    return {x: x * BLOCK_SIZE_W, y: y * BLOCK_SIZE_H};
};

export const KeyToDirection = (keycode: number): Direction => {
    switch (keycode) {
        case KEY.RIGHT:
            return Direction.RIGHT;
        case KEY.UP:
            return Direction.UP;
        case KEY.DOWN:
            return Direction.DOWN;
        case KEY.LEFT:
            return Direction.LEFT;
        default:
            throw new Error('Invalid keycode');
    }
}
