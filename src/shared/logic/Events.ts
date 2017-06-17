import {
    ClientMovePayload,
    ServerConnectionEstablishedPayload,
    ServerPlayerConnectedPayload,
    ServerPlayerMovedPayload
} from './Payloads';

interface Event<T> {
    type: string,
    timestamp: number
    payload?: T
}

const EventTypes = {
    SERVER_CONNECTION_ESTABLISHED: 'SERVER_CONNECTION_ESTABLISHED',
    SERVER_PLAYER_CONNECTED: 'SERVER_PLAYER_CONNECTED',
    SERVER_PLAYER_DISCONNECTED: 'SERVER_PLAYER_DISCONNECTED',

    SERVER_PLAYER_MOVED: 'SERVER_PLAYER_MOVED',
    CLIENT_MOVE: 'CLIENT_MOVE'
};

const serverConnectionEstablished = (payload: ServerConnectionEstablishedPayload): Event<ServerConnectionEstablishedPayload> => {
    return {
        type: EventTypes.SERVER_CONNECTION_ESTABLISHED,
        timestamp: new Date().getTime(),
        payload: {
            ...payload
        }
    }
};

const serverPlayerConnected = (payload: ServerPlayerConnectedPayload): Event<ServerPlayerConnectedPayload> => {
    return {
        type: EventTypes.SERVER_PLAYER_CONNECTED,
        timestamp: new Date().getTime(),
        payload: {
            ...payload
        }
    };
};

const serverPlayerDisconnected = (payload: ServerPlayerConnectedPayload): Event<ServerPlayerConnectedPayload> => {
    return {
        type: EventTypes.SERVER_PLAYER_DISCONNECTED,
        timestamp: new Date().getTime(),
        payload: {
            ...payload
        }
    };
};

const serverPlayerMoved = (payload: ServerPlayerMovedPayload): Event<ServerPlayerMovedPayload> => {
    return {
        type: EventTypes.SERVER_PLAYER_MOVED,
        timestamp: new Date().getTime(),
        payload: {
            ...payload
        }
    }
};

const clientMove = (payload: ClientMovePayload): Event<ClientMovePayload> => {
    return {
        type: EventTypes.CLIENT_MOVE,
        timestamp: new Date().getTime(),
        payload: {
            ...payload
        }
    }
};

export {
    Event,
    EventTypes,

    serverPlayerConnected,
    serverPlayerDisconnected,
    serverConnectionEstablished,

    serverPlayerMoved,
    clientMove
}
