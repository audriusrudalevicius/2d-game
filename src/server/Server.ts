import * as http from "http";
import * as SocketIO from "socket.io";
import * as express from "express";
import * as path from "path";
import * as compression from "compression";
import Connection from "../shared/ConnectionInfo";
import SocketEvents from "../shared/SocketEvents";
import {GameState} from "./GameState";
import {
    Event,
    EventTypes,
    serverConnectionEstablished,
    serverPlayerConnected,
    serverPlayerDisconnected
} from "../shared/net/Events";
import {ClientMovePayload} from "../shared/net/Payloads";
import {Player} from "./entities/Player";
import {SharedConfigInterface} from "../shared/Interfaces";
import {DefaultConfig} from "../shared/Params";

const CACHE_LIFE_TIME = 533280;

class Server {
    private app: express.Application = express();
    private io: SocketIO.Server;
    private httpServer: http.Server;
    private clients: {[key: string]: Connection};
    private gameState: GameState;
    private configFileContent: string;
    private configFile: SharedConfigInterface;

    constructor(gameState: GameState) {
        this.app = express();
        this.app.use(compression());
        this.app.use('/assets', express.static(path.join(__dirname, 'assets'), {maxAge: CACHE_LIFE_TIME}));
        this.app.use('/main.bundle.js', express.static(path.join(__dirname, 'main.bundle.js'), {maxAge: CACHE_LIFE_TIME}));
        this.app.use('/commons.js', express.static(path.join(__dirname, 'commons.js'), {maxAge: CACHE_LIFE_TIME}));

        this.httpServer = http.createServer(this.app);
        this.io = SocketIO(this.httpServer);
        this.configFile = {
            serverUrl: process.env.EXT_HTTP_URL || DefaultConfig.serverUrl,
            serverPort: process.env.EXT_HTTP_PORT || DefaultConfig.serverPort
        };

        this.gameState = gameState;

        this.clients = {};
    }

    public listen(port: number = DefaultConfig.serverPort): void {
        this.configFileContent = `var SHARED_CONFIG = ${JSON.stringify(this.configFile)};`;

        this.httpServer.listen(port, () => {
            console.log(`Server listening on port ${ port }`);
        });

        this.app.get('/config.js', (req, res) => {
            res.setHeader('content-type', 'text/javascript');
            res.setHeader('Cache-Control', 'no-cache');
            res.write(this.configFileContent);
            res.end();
        });

        this.app.get('/', function (req, res) {
            res.sendFile(path.join(__dirname, 'index.html'));
        });

        this.io.on(SocketEvents.Connection, (socket: SocketIO.Socket) => {
            this.clients[socket.id] = {
                clientID: socket.id,
                connectionTimestamp: new Date().getTime()
            };
            let player: Player;
            if (!this.gameState.findPlayer(socket.id)) {
                player = new Player(socket.id, this.gameState.map.pickRandomFreePosition());
                this.gameState.addPlayer(player);
            } else {
                player = this.gameState.findPlayer(socket.id);
            }

            socket.emit(
                SocketEvents.Event,
                serverConnectionEstablished({
                    connectionInfo: this.clients[socket.id],
                    playerID: player.clientID,
                    position: player.position,
                    state: this.gameState.getState()
                })
            );

            socket.broadcast.emit(
                SocketEvents.Event,
                serverPlayerConnected({
                    playerID: player.clientID,
                    position: player.position
                })
            );

            console.log(`Server received client connection with id: ${ socket.id }`);

            socket.on(SocketEvents.Event, (event: Event<any>) => {
                console.log(`IN - Event ${event.type}`, event);
                switch (event.type) {
                    case EventTypes.CLIENT_MOVE:
                        let payload = event.payload as ClientMovePayload;
                        /* Validate movement */
                        break;
                }
            });

            socket.on(SocketEvents.Disconnect, () => {
                this.io.emit('event', serverPlayerDisconnected({playerID: this.clients[socket.id].clientID}));
                delete this.clients[socket.id];
                this.gameState.removePlayer(socket.id);
            });
        });
    }
}

export default Server;
