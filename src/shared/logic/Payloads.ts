import Connection from '../ConnectionInfo';

interface ConnectionEstablishedPayload {
    connectionInfo: Connection,
    state: {
        mapState: number[][],
        gameState: any
    }
}

interface PlayerConnectedPayload {
    clientID: string
}

export {
    ConnectionEstablishedPayload,
    PlayerConnectedPayload
};
