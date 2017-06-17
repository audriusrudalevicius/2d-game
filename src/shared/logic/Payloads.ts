import Connection from '../ConnectionInfo';
import { Position, Movement } from '../Entities';

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

interface ServerPlayerMovedPayload {
    playerID: string,
    position: Position;
}

interface ClientMovePayload {
    clientID: string,
    position: Position,
    movement: Movement
}

export {
    ServerConnectionEstablishedPayload,
    ServerPlayerConnectedPayload,
    ServerPlayerMovedPayload,

    ClientMovePayload
};
