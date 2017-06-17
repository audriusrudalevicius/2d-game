import * as SocketIOClient from 'socket.io-client';
import {
  Event,
  EventTypes,
  ConnectionEstablishedPayload
} from '../shared/logic/Events';

import Connection from '../shared/ConnectionInfo';
import SocketEvents from '../shared/SocketEvents';

class NetworkService {
  private static _instance: NetworkService;
  public static getInstance() {
    if (this._instance === null || this._instance === undefined) {
      this._instance = new NetworkService();
    }

    return this._instance;
  }

  private socket: SocketIOClient.Socket;

  private _connectionInfo: Connection;
  public getConnectionInfo() {
    return this._connectionInfo;
  }

  constructor() {
    this.socket = SocketIOClient('http://localhost:3000', { forceNew: false });
  }

  public connect() {
    this.socket.open();
    this.listen();
  }

  public disconnect() {
    this.socket.disconnect();
  }

  public send(event: Event<any>) {
    this.socket.emit(SocketEvents.Event, event);
  }

  public listen() {
    this.socket.on(SocketEvents.Event, (event: Event<any>) => {
      switch (event.type) {
        case EventTypes.CONNECTION_ESTABLISHED:
          let payload = event.payload as ConnectionEstablishedPayload;
          this._connectionInfo = payload.connectionInfo;
      }
    })
  };
}

export const getNetworkService = NetworkService.getInstance;
export default NetworkService;
