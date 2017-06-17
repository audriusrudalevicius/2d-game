interface Move {

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
