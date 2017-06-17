import {Map} from "./map/Map";
import {Position} from "./map/Position";

enum MovementDirection {
    UP      = 0,
    DOWN,
    LEFT,
    RIGHT
}

interface Movement {
    direction: MovementDirection
}

interface GameState {
    map: Map;
    players: Array<Player>;
    bombs: Array<Bomb>;
}

interface Player {
    clientID: string;
    name: string;
    position: Position;
    kills: number;
    suicides: number;
}

interface Bomb {
    timestamp: number;
    position: Position;
}

export {
    Movement,
    GameState,
    Player,
    Bomb
};
