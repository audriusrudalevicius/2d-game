import Connection from "../ConnectionInfo";
import {MovementInterface, PositionInterface} from "../Entities";
import {Direction} from "../Direction";

interface ServerConnectionEstablishedPayload {
    connectionInfo: Connection,
    state: {
        mapState: number[][],
        gameState: any
    }
}

interface ServerPlayerConnectedPayload {
    playerID: string
}

interface ServerPlayerMovingPayload {
    playerID: string,
    origin: PositionInterface;
    direction: Direction;
}

interface ClientMovePayload {
    clientID: string,
    position: PositionInterface,
    movement: MovementInterface
}

export {
    ServerConnectionEstablishedPayload,
    ServerPlayerConnectedPayload,
    ServerPlayerMovingPayload,

    ClientMovePayload
};
