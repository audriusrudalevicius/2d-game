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
    CONNECTION_ESTABLISHED: 'CONNECTION_ESTABLISHED',
    PLAYER_CONNECTED: 'PLAYER_CONNECTED',
    PLAYER_DISCONNECTED: 'PLAYER_DISCONNECTED'
};

const connectionEstablished = (payload: ConnectionEstablishedPayload): Event<ConnectionEstablishedPayload> => {
    return {
        type: EventTypes.CONNECTION_ESTABLISHED,
        timestamp: new Date().getTime(),
        payload: {
            ...payload
        }
    }
};

const playerConnected = (payload: PlayerConnectedPayload): Event<PlayerConnectedPayload> => {
    return {
        type: EventTypes.PLAYER_CONNECTED,
        timestamp: new Date().getTime(),
        payload: {
            ...payload
        }
    };
};

const playerDisconnected = (payload: PlayerConnectedPayload): Event<PlayerConnectedPayload> => {
    return {
        type: EventTypes.PLAYER_DISCONNECTED,
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
