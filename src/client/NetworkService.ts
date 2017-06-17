import * as SocketIOClient from 'socket.io-client';
import {
  Event
} from '../shared/events';

interface ConnectionInfo {
  clientID: string,
  connectionTimestamp: number
}

class NetworkService {
  private static _instance: NetworkService;
  public static getInstance() {
    if (this._instance === null || this._instance === undefined) {
      this._instance = new NetworkService();
    }

    return this._instance;
  }

  private socket: SocketIOClient.Socket;

  private _connectionInfo: ConnectionInfo;
  public getConnectionInfo() {
    return this._connectionInfo;
  }

  constructor() {
    this.socket = SocketIOClient('http://localhost:3000', { forceNew: false });
  }

  public connect() {
    this.socket.open();
    this.socket.on('connected', (data: any) => {
      this._connectionInfo = data;
    });

    this.listen();
  }

  public disconnect() {
    this.socket.disconnect();
  }

  public send(event: Event<any>) {
    this.socket.emit('event', event);
  }

  public listen() {
    this.socket.on('event', (event: Event<any>) => {
      switch (event.type) {
        /* */
      }
    })
  };
}

const getNetworkService = NetworkService.getInstance;
export default getNetworkService;
