import {MapGenerator} from "./map/MapGenerator";
import {Map} from "./map/Map";
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
        this.map.indexFreeSpace();
    }

    public getState() {
        return {
            mapState: this.map.getMap(),
            gameState: {}
        }
    }

    public addPlayer(player:Player) {
        this.players.push(player);
    }

    public findPlayer(playerId: string):Player {
        return this.players.find((p) => p.clientID == playerId);
    }

    public removePlayer(playerId: string) {
        this.players  = this.players.filter(player => player.clientID !== playerId);
    }
}
