import {Direction} from "./Direction";

export interface MovementInterface {
    direction: Direction
}

export interface PositionInterface {
    x: number;
    y: number;
}

export interface PlayerInterface {
    playerID: string;
    name: string;
    position:PositionInterface;
    kills: number;
    suicides: number;
    color: string;
}

export interface BombInterface {
    timestamp: number;
    position: PositionInterface;
}
