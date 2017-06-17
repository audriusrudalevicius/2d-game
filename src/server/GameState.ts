import {MapGenerator} from "../shared/map/MapGenerator";
import {Map} from "../shared/map/Map";
import {GameState as GameStateInterface, Player, Bomb} from '../shared/Entities';

export class GameState implements GameStateInterface {
    private mapGenerator: MapGenerator;
    map: Map;
    players: Array<Player>;
    bombs: Array<Bomb>;

    constructor(mapGenerator: MapGenerator) {
        this.mapGenerator = mapGenerator;
    }

    public start() {
        this.map = this.mapGenerator.generate(11, 15);
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
}
