import {BLOCK_TYPE} from "../../shared/BlockType";
import {Position} from "./Position";
import {RandomChoice, RandomInt} from "../../shared/Math";

export class Map {
    private rows: number;
    private cols: number;
    private map: Array<Array<number>> = [];
    private freeSpaces:Position[] = [];

    constructor(rows: number, cols: number) {
        this.rows = rows;
        this.cols = cols;
        this.map = this.fillEmptyMap();
    }

    public indexFreeSpace()
    {
        if (typeof this.map == 'undefined') {
            throw new Error('Map is empty');
        }
        console.log(this.map, {rows: this.rows, cols: this.cols});
        this.freeSpaces = [];
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                const pos = new Position(x, y);
                if (this.isEmpty(pos)) {
                    this.freeSpaces.push(pos);
                }
            }
        }
    }

    private fillEmptyMap() {
        const gameMap = [];

        for (let row = 0; row < this.rows; row++) {
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

    pickRandomFreePosition(): Position {
        if (!this.freeSpaces.length) {
            throw new Error('No free space');
        }
        return RandomChoice(this.freeSpaces);
    }

    isEmpty(position: Position) {
        return this.map[position.y][position.x] === 0
    }
}
