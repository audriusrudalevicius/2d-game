import {MapGenerator} from "../shared/map/MapGenerator";
import {Map} from "../shared/map/Map";
import {PlayerInterface, BombInterface} from '../shared/Entities';
import {Player} from "./entities/Player";

const MAP = {
    rows: 11,
    cols: 15
};

export class GameState {
    private mapGenerator: MapGenerator;
    map: Map;
    players: Array<PlayerInterface> = [];
    bombs: Array<BombInterface> = [];

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

    public addPlayer(playerId: string) {
        this.players.push(
            new Player(playerId, this.map.getRandomEmptyPosition())
        );
    }

    public removePlayer(playerId: string) {
        this.players  = this.players.filter(player => player.clientID !== playerId);
    }
}
