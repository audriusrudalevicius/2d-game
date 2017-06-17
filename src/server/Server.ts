import * as http from 'http';
import * as SocketIO from 'socket.io';

import Connection from '../shared/ConnectionInfo';
import SocketEvents from '../shared/SocketEvents';

import {
  Event,
  EventTypes,

  playerConnected,
  playerDisconnected,
  connectionEstablished
} from '../shared/logic/Events';

class Server {
  public static PORT: number = 3000;

  private io: SocketIO.Server;
  private httpServer: http.Server;
  private clients: { [key: string]: Connection };

  constructor() {
    this.httpServer = http.createServer();
    this.io = this.init(this.httpServer);

    this.clients = {};
  }

  public init(httpServer: http.Server): SocketIO.Server {
    return SocketIO(httpServer);
  }

  public listen(port: number = Server.PORT): void {
    this.httpServer.listen(port, () => {
      console.log(`Server listening on port ${ port }`);
    });

    this.io.on(SocketEvents.Connection, (socket: SocketIO.Socket) => {
      this.clients[socket.id] = {
        clientID: socket.id,
        connectionTimestamp: new Date().getTime()
      };

      socket.broadcast.emit(
        SocketEvents.Event,
        playerConnected({ clientID: this.clients[socket.id].clientID })
      );

      socket.emit(
        SocketEvents.Event,
        connectionEstablished({
          connectionInfo: this.clients[socket.id],
          map: []
        })
      );

      console.log(`Server received client connection with id: ${ socket.id }`);

      socket.on(SocketEvents.Event, (event: Event<any>) => {
        switch (event.type) {
          /* */
        }
      });

      socket.on(SocketEvents.Disconnect, () => {
        this.io.emit('event', playerDisconnected({ clientID: this.clients[socket.id].clientID }));
        delete this.clients[socket.id];
      });
    });
  }
}

export default Server;
