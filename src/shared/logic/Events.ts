import {
    ConnectionEstablishedPayload,
    PlayerConnectedPayload
} from './Payloads';

interface Event<T> {
    type: string,
    timestamp: number
    payload?: T
}

const EventTypes = {
    SERVER_CONNECTION_ESTABLISHED: 'SERVER_CONNECTION_ESTABLISHED',
    SERVER_PLAYER_CONNECTED: 'SERVER_PLAYER_CONNECTED',
    SERVER_PLAYER_DISCONNECTED: 'SERVER_PLAYER_DISCONNECTED'
};

const connectionEstablished = (payload: ConnectionEstablishedPayload): Event<ConnectionEstablishedPayload> => {
    return {
        type: EventTypes.SERVER_CONNECTION_ESTABLISHED,
        timestamp: new Date().getTime(),
        payload: {
            ...payload
        }
    }
};

const playerConnected = (payload: PlayerConnectedPayload): Event<PlayerConnectedPayload> => {
    return {
        type: EventTypes.SERVER_PLAYER_CONNECTED,
        timestamp: new Date().getTime(),
        payload: {
            ...payload
        }
    };
};

const playerDisconnected = (payload: PlayerConnectedPayload): Event<PlayerConnectedPayload> => {
    return {
        type: EventTypes.SERVER_PLAYER_DISCONNECTED,
        timestamp: new Date().getTime(),
        payload: {
            ...payload
        }
    };
};

export {
    Event,
    EventTypes,

    playerConnected,
    playerDisconnected,
    connectionEstablished
}
