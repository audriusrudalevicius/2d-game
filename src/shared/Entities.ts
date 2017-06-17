enum MovementDirection {
    UP      = 0,
    DOWN,
    LEFT,
    RIGHT
}

interface Movement {
    direction: MovementDirection
}

interface Position {
    x: number;
    y: number;
}

interface GameState {
    map:Array<Array<number>>;
    players:Array<Player>;
    bombs:Array<Bomb>;
}

interface Player {
    clientID: string;
    name: string;
    position:Position;
    kills: number;
    suicides: number;
}

interface Bomb {
    timestamp: number;
    position: Position;
}

export {
    Movement,
    Position,
    GameState,
    Player,
    Bomb
};
