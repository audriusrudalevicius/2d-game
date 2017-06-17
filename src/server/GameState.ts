import {MapGenerator} from "../shared/map/MapGenerator";
import {Map} from "../shared/map/Map";
import {GameState as GameStateInterface, Player, Bomb} from '../shared/Entities';

const MAP = {
    rows: 11,
    cols: 15
};

interface randomNumber {
    x: number,
    y: number
}


export class GameState implements GameStateInterface {
    private mapGenerator: MapGenerator;
    map: Map;
    players: Array<Player>;
    bombs: Array<Bomb>;

    constructor(mapGenerator: MapGenerator) {
        this.mapGenerator = mapGenerator;
    }

    public start() {
        this.map = this.mapGenerator.generate(MAP.rows, MAP.cols);
    }

    public getState() {
        return {
            mapState: this.map.getMap(),
            gameState: {}
        }
    }

    public addPlayer(player: any) {
        this.players.push(player);
    }

    private getStartPosition() {

    }

    private getRandomNumber():number {
        return
    }
}
