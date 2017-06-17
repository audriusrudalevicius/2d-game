import {Map} from "./Map";
import {Point} from "./Point";
import {BLOCK_TYPE} from "../BlockType";

export class MapGenerator {
    private map: Map;

    generate(rows: number, cols: number) {
        this.map = new Map(rows, cols);

        for (let row = 0; row < cols; row++) {
            this.map.setTile(new Point(row, 0), BLOCK_TYPE.SOLID);
            this.map.setTile(new Point(row, rows-1), BLOCK_TYPE.SOLID);
        }

        for (let col = 0; col < rows; col++) {
            this.map.setTile(new Point(0, col), BLOCK_TYPE.SOLID);
            this.map.setTile(new Point(cols-1, col), BLOCK_TYPE.SOLID);
        }


        for (let row = 2; row < rows-2; row++) {
            if (row % 2 != 0) {
                continue;
            }

            for (let col = 2; col < cols - 2; col++) {
                if (col % 2 == 0) {
                    this.map.setTile(new Point(col, row), BLOCK_TYPE.SOLID);
                }
            }
        }

        // this.map.setTile(new Point(1, 1), BLOCK_TYPE.SOLID);
        // this.map.setTile(new Point(3, 1), BLOCK_TYPE.SOLID);
        // this.map.setTile(new Point(5, 1), BLOCK_TYPE.SOLID);
        // this.map.setTile(new Point(7, 1), BLOCK_TYPE.SOLID);
    }

    public getMap() {
        return this.map;
    }
}
