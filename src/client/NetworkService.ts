import * as SocketIOClient from "socket.io-client";
import {NetworkEvent, EventTypes} from "../shared/net/Events";
import {ServerConnectionEstablishedPayload} from "../shared/net/Payloads";
import Connection from "../shared/ConnectionInfo";
import SocketEvents from "../shared/SocketEvents";
import {Observable} from "rxjs/Observable";

class NetworkService {
    private socket: SocketIOClient.Socket;
    private _observable: Observable<NetworkEvent<any, any>>;
    private _connectionInfo: Connection;
    private _serverUrl:string;

    constructor(serverUrl: string) {
        this._serverUrl = serverUrl;
    }

    get connectionInfo(): Connection {
        return this._connectionInfo;
    }

    public connect(): Observable<NetworkEvent<any, any>> {
        this._observable = new Observable((observer) => {
            this.socket = SocketIOClient(this._serverUrl);
            this.socket.on(SocketEvents.Event, (event: NetworkEvent<any, any>) => {
                switch (event.type) {
                    case EventTypes.SERVER_CONNECTION_ESTABLISHED:
                        let payload = event.payload as ServerConnectionEstablishedPayload;
                        this._connectionInfo = payload.connectionInfo;
                }

                observer.next(event);
            });
            this.socket.on(SocketEvents.Disconnect, () => {
                observer.complete();
            });
            return () => {
                this.socket.disconnect();
            }
        });

        return this._observable;
    }

    public send(event: NetworkEvent<any, any>) {
        this.socket.emit(SocketEvents.Event, event);
    }
}

export default NetworkService;
