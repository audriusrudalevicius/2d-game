import * as http from 'http';
import * as SocketIO from 'socket.io';

import Connection from '../shared/ConnectionInfo';
import SocketEvents from '../shared/SocketEvents';
import { GameState } from "./GameState";

import {
  Event,
  EventTypes,

  serverPlayerConnected,
  serverPlayerDisconnected,
  serverConnectionEstablished
} from '../shared/logic/Events';

import {
  ClientMovePayload
} from "../shared/logic/Payloads";

class Server {
  public static PORT: number = 3000;

  private io: SocketIO.Server;
  private httpServer: http.Server;
  private clients: { [key: string]: Connection };
  private gameState: GameState;

  constructor(gameState: GameState) {
    this.httpServer = http.createServer();
    this.io = this.init(this.httpServer);

    this.gameState = gameState;

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

      this.gameState.addPlayer(socket.id);

      socket.broadcast.emit(
        SocketEvents.Event,
        serverPlayerConnected({ playerID: this.clients[socket.id].clientID })
      );

      socket.emit(
        SocketEvents.Event,
        serverConnectionEstablished({
          connectionInfo: this.clients[socket.id],
          state: this.gameState.getState()
        })
      );

      console.log(`Server received client connection with id: ${ socket.id }`);

      socket.on(SocketEvents.Event, (event: Event<any>) => {
        switch (event.type) {
          case EventTypes.CLIENT_MOVE:
            let payload = event.payload as ClientMovePayload;
            /* Validate movement */ break;
        }
      });

      socket.on(SocketEvents.Disconnect, () => {
        this.io.emit('event', serverPlayerDisconnected({ playerID: this.clients[socket.id].clientID }));
        delete this.clients[socket.id];
        this.gameState.removePlayer(socket.id);
      });
    });
  }
}

export default Server;
