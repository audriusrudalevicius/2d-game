import * as SocketIOClient from 'socket.io-client';
import {
  Event
} from '../shared/events';

interface ConnectionInfo {
  clientID: string,
  connectionTimestamp: number
}

class NetworkService {
  private socket: SocketIOClient.Socket;
  private connectionInfo: ConnectionInfo;

  constructor() {
    this.socket = SocketIOClient('http://localhost:3000', {
      forceNew: false
    });
  }

  public connect() {
    this.socket.open();
    this.socket.on('connected', (data: any) => {
      this.connectionInfo = data;
    });

    this.init();
  }

  public disconnect() {
    this.socket.disconnect();
  }

  public init() {
    this.socket.on('event', (event: Event<any>) => {
      switch (event.type) {
        /* */
      }
    })
  };
}

export default NetworkService;
