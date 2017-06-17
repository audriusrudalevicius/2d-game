import {Map} from "./Map";
import {Point} from "./Point";
import {BLOCK_TYPE} from "../BlockType";

export class MapGenerator {
    generate(rows: number, cols: number) {
        const map = new Map(rows, cols);

        for (let row = 0; row < cols; row++) {
            map.setTile(new Point(row, 0), BLOCK_TYPE.SOLID);
            map.setTile(new Point(row, rows-1), BLOCK_TYPE.SOLID);
        }

        for (let col = 0; col < rows; col++) {
            map.setTile(new Point(0, col), BLOCK_TYPE.SOLID);
            map.setTile(new Point(cols-1, col), BLOCK_TYPE.SOLID);
        }


        for (let row = 2; row < rows-2; row++) {
            if (row % 2 != 0) {
                continue;
            }

            for (let col = 2; col < cols - 2; col++) {
                if (col % 2 == 0) {
                    map.setTile(new Point(col, row), BLOCK_TYPE.SOLID);
                }
            }
        }
        
        return map;
    }
}
