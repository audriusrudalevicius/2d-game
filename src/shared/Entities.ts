import {Direction} from "./Direction";

export interface MovementInterface {
    direction: Direction
}

export interface PositionInterface {
    x: number;
    y: number;
}

export interface GameStateInterface {
    map: Array<Array<number>>;
    players:Array<PlayerInterface>;
    bombs:Array<BombInterface>;
}

export interface PlayerInterface {
    clientID: string;
    name: string;
    position:PositionInterface;
    kills: number;
    suicides: number;
}

export interface BombInterface {
    timestamp: number;
    position: PositionInterface;
}
