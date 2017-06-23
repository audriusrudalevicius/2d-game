import {
    ClientMovePayload,
    ServerConnectionEstablishedPayload,
    ServerPlayerConnectedPayload,
    ServerPlayerDisconnectedPayload,
    ServerPlayerMovingPayload
} from "./Payloads";

export interface NetworkEvent<T, P> {
    type: T,
    timestamp: number
    payload?: P
}

export function CreateEvent<T extends string, P>(type: T, payload: P): NetworkEvent<T, P> {
    return {type, payload, timestamp: new Date().getTime()};
}

export const EventTypes = {
    SERVER_CONNECTION_ESTABLISHED: 'SERVER_CONNECTION_ESTABLISHED',
    SERVER_PLAYER_CONNECTED: 'SERVER_PLAYER_CONNECTED',
    SERVER_PLAYER_DISCONNECTED: 'SERVER_PLAYER_DISCONNECTED',
    SERVER_PLAYER_MOVED: 'SERVER_PLAYER_MOVED',
    CLIENT_MOVE: 'CLIENT_MOVE'
};

export type ConnectedToServerAction = NetworkEvent<typeof EventTypes.SERVER_CONNECTION_ESTABLISHED, ServerConnectionEstablishedPayload>;
export type PlayerJoinsAction = NetworkEvent<typeof EventTypes.SERVER_PLAYER_CONNECTED, ServerPlayerConnectedPayload>;
export type PlayerLeavesAction = NetworkEvent<typeof EventTypes.SERVER_PLAYER_DISCONNECTED, ServerPlayerDisconnectedPayload>;
export type PlayerMovingAction = NetworkEvent<typeof EventTypes.SERVER_PLAYER_MOVED, ClientMovePayload>;
export type PlayerMovedAction = NetworkEvent<typeof EventTypes.SERVER_PLAYER_MOVED, ServerPlayerMovingPayload>;

export const serverConnectionEstablished = (payload: ServerConnectionEstablishedPayload): NetworkEvent<typeof EventTypes.SERVER_CONNECTION_ESTABLISHED, ServerConnectionEstablishedPayload> => {
    return CreateEvent(EventTypes.SERVER_CONNECTION_ESTABLISHED, payload);
};

export const serverPlayerConnected = (payload: ServerPlayerConnectedPayload): NetworkEvent<typeof EventTypes.SERVER_PLAYER_CONNECTED, ServerPlayerConnectedPayload> => {
    return CreateEvent(EventTypes.SERVER_PLAYER_CONNECTED, payload);
};

export const serverPlayerDisconnected = (payload: ServerPlayerDisconnectedPayload): NetworkEvent<typeof EventTypes.SERVER_PLAYER_CONNECTED, ServerPlayerDisconnectedPayload> => {
    return CreateEvent(EventTypes.SERVER_PLAYER_DISCONNECTED, payload);
};

export const clientPlayerMoving = (payload: ClientMovePayload): NetworkEvent<typeof EventTypes.CLIENT_MOVE, ClientMovePayload> => {
    return CreateEvent(EventTypes.CLIENT_MOVE, payload);
};

export const serverPlayerMoved = (payload: ServerPlayerMovingPayload): NetworkEvent<typeof EventTypes.SERVER_PLAYER_MOVED, ServerPlayerMovingPayload> => {
    return CreateEvent(EventTypes.SERVER_PLAYER_MOVED, payload);
};
