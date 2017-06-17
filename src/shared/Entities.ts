import {Map} from "./map/Map";
import {Point} from "./map/Point";

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
    position: Point;
    kills: number;
    suicides: number;
}

interface Bomb {
    timestamp: number;
    position: Point;
}

export {
    Movement,
    GameState,
    Player,
    Bomb
};
