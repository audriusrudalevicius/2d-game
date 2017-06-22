import Connection from "../ConnectionInfo";
import {BombInterface, MovementInterface, PlayerInterface, PositionInterface} from "../Entities";
import {Direction} from "../Direction";

export interface Player {
    playerID: string,
    position: PositionInterface
}

export interface ServerConnectionEstablishedPayload {
    connectionInfo: Connection,
    playerID: string,
    position: PositionInterface,
    map: number[][],
    players:Array<PlayerInterface>;
    bombs:Array<BombInterface>;
}

export interface ServerPlayerDisconnectedPayload {
    playerID: string
}

export interface ServerPlayerConnectedPayload {
    playerID: string,
    position: PositionInterface
}

export interface ServerPlayerMovingPayload {
    playerID: string,
    origin: PositionInterface,
    direction: Direction
}

export interface ClientMovePayload {
    playerID: string,
    position: PositionInterface,
    movement: MovementInterface
}
