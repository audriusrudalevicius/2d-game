import {Map} from "./Map";
import {Position} from "./Position";
import {BLOCK_TYPE} from "../../shared/BlockType";

export class MapGenerator {
    generate(rows: number, cols: number) {
        const map = new Map(rows, cols);

        for (let row = 0; row < cols; row++) {
            map.setTile(new Position(row, 0), BLOCK_TYPE.SOLID);
            map.setTile(new Position(row, rows - 1), BLOCK_TYPE.SOLID);
        }

        for (let col = 0; col < rows; col++) {
            map.setTile(new Position(0, col), BLOCK_TYPE.SOLID);
            map.setTile(new Position(cols - 1, col), BLOCK_TYPE.SOLID);
        }

        for (let row = 2; row < rows - 2; row++) {
            if (row % 2 != 0) {
                continue;
            }

            for (let col = 2; col < cols - 2; col++) {
                if (col % 2 == 0) {
                    map.setTile(new Position(col, row), BLOCK_TYPE.SOLID);
                }
            }
        }

        return map;
    }
}
