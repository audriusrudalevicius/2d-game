import Connection from "../ConnectionInfo";
import {BombInterface, MovementInterface, PlayerInterface, PositionInterface} from "../Entities";
import {Direction} from "../Direction";

export interface Player {
    playerID: string,
    position: PositionInterface
}

export interface ServerConnectionEstablishedPayload {
    connectionInfo: Connection,
    player: PlayerInterface,
    map: number[][],
    players:Array<PlayerInterface>;
    bombs:Array<BombInterface>;
}

export interface ServerPlayerDisconnectedPayload {
    playerID: string
}

export interface ServerPlayerConnectedPayload {
    player:PlayerInterface
}

export interface ServerPlayerMovingPayload {
    playerID: string,
    destination: PositionInterface
}

export interface ClientMovePayload {
    playerID: string,
    origin: PositionInterface,
    direction: Direction
}
