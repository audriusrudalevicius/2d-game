import {BLOCK_SIZE_H, BLOCK_SIZE_W} from "./Constants";
import {Direction} from "../shared/Direction";
import {KEY} from "../shared/Keys";
import {PositionInterface} from "../shared/Entities";

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
};

export const DirectionToPos = (currentPos: PositionInterface, direction: Direction): PositionInterface => {
    switch (direction) {
        case Direction.RIGHT:
            return {x: currentPos.x += 1, y: currentPos.y};
        case Direction.UP:
            return {x: currentPos.x, y: currentPos.y -= 1};
        case Direction.DOWN:
            return {x: currentPos.x, y: currentPos.y += 1};
        case Direction.LEFT:
            return {x: currentPos.x -= 1, y: currentPos.y};
        default:
            throw new Error('Invalid direction');
    }
};
