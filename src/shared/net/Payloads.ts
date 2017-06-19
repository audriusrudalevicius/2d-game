import Connection from "../ConnectionInfo";
import {MovementInterface, PositionInterface} from "../Entities";
import {Direction} from "../Direction";

export interface ServerConnectionEstablishedPayload {
    connectionInfo: Connection,
    playerID: string,
    position: PositionInterface;
    state: {
        mapState: number[][],
        gameState: any
    }
}

export interface ServerPlayerDisconnectedPayload {
    playerID: string;
}

export interface ServerPlayerConnectedPayload {
    playerID: string;
    position: PositionInterface;
}

export interface ServerPlayerMovingPayload {
    playerID: string;
    origin: PositionInterface;
    direction: Direction;
}

export interface ClientMovePayload {
    playerID: string,
    position: PositionInterface,
    movement: MovementInterface
}
