import Connection from '../ConnectionInfo';

interface ConnectionEstablishedPayload {
    connectionInfo: Connection,
    map: number[][]
}

interface PlayerConnectedPayload {
    clientID: string
}

export {
    ConnectionEstablishedPayload,
    PlayerConnectedPayload
};
