import { BLOCK_TYPE } from "../BlockType";
import {Position} from "./Position";

export class Map {
    private rows: number;
    private cols: number;
    private map: any = [];

    constructor(rows: number, cols: number) {
        this.rows = rows;
        this.cols = cols;

        this.map = this.generateMap();
    }

    private generateMap() {
        const gameMap =[];

        for (let row=0; row < this.rows; row++) {
            let data = [];
            for (let col = 0; col < this.cols; col++) {
                data.push(BLOCK_TYPE.EMPTY);
            }
            gameMap.push(data);
        }
        return gameMap;
    }

    setTile(position: Position, blockType: number) {
        this.map[position.y][position.x] = blockType;
    }

    getMap() {
        return this.map;
    }
}
