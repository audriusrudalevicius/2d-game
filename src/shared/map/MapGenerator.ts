import {Map} from "./Map";
import {Point} from "./Point";
import {BLOCK_TYPE} from "../BlockType";

export class MapGenerator {
    private map: Map;

    generate(cols: number, rows: number) {
        this.map = new Map(cols, rows);

        this.map.setTile(new Point(1, 1), BLOCK_TYPE.SOLID);
        this.map.setTile(new Point(3, 1), BLOCK_TYPE.SOLID);
        this.map.setTile(new Point(5, 1), BLOCK_TYPE.SOLID);
        this.map.setTile(new Point(7, 1), BLOCK_TYPE.SOLID);
    }

    public getMap() {
        return this.map;
    }
}
