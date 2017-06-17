import {MapGenerator} from "../shared/map/MapGenerator";
import {Map} from "../shared/map/Map";

export class GameState {
    private mapGenerator: MapGenerator;
    private map: Map;

    constructor(mapGenerator: MapGenerator) {
        this.mapGenerator = mapGenerator;
    }

    public start() {
        this.map = this.mapGenerator.generate(11, 15);
    }

    public getMapState() {
        return this.map.toJSON();
    }
}