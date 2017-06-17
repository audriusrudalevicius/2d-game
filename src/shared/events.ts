interface Event<T> {
  type: string,
  timestamp: number
  payload?: T
}

const EventTypes = {
  PLAYER_CONNECTED: 'PLAYER_CONNECTED',
  PLAYER_DISCONNECTED: 'PLAYER_DISCONNECTED'
};

interface PlayerConnectedPayload {
  clientID: string
}

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
  playerDisconnected
}
