import * as http from 'http';
import * as SocketIO from 'socket.io';

import { 
  Event,
  EventTypes,

  playerConnected,
  playerDisconnected
} from '../shared/events';

const SocketEvents = {
  Connection: 'connection',
  Event: 'event',
  Disconnect: 'disconnect'
};

interface Connection {
  clientID: string,
  connectionTimestamp: number
}

class Server {
  public static PORT: number = 3000;

  private io: SocketIO.Server;
  private httpServer: http.Server;
  private clients: { [key: string]: Connection }

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
      }

      socket.broadcast.emit('event', playerConnected({ clientID: this.clients[socket.id].clientID }));
      socket.emit('connected', this.clients[socket.id]);
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

