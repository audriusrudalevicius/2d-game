import {BLOCK_SIZE_H, BLOCK_SIZE_W} from "./Constants";

export const WorldToCanvas = (x: number, y: number) => {
    return {x: x * BLOCK_SIZE_W, y: y * BLOCK_SIZE_H};
};
