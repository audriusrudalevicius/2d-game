import * as SocketIOClient from "socket.io-client";
import {Event, EventTypes} from "../shared/logic/Events";
import {ServerConnectionEstablishedPayload} from "../shared/logic/Payloads";
import Connection from "../shared/ConnectionInfo";
import SocketEvents from "../shared/SocketEvents";
import {Observable} from "rxjs/Observable";

class NetworkService {
    private socket: SocketIOClient.Socket;
    private _observable: Observable<Event<any>>;
    private _connectionInfo: Connection;

    get connectionInfo(): Connection {
        return this._connectionInfo;
    }

    public connect(): Observable<Event<any>> {
        this._observable = new Observable((observer) => {
            this.socket = SocketIOClient('http://localhost:3000');
            this.socket.on(SocketEvents.Event, (event: Event<any>) => {
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

    public send(event: Event<any>) {
        this.socket.emit(SocketEvents.Event, event);
    }
}

export default NetworkService;
