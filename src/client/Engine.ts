import {Timer} from "./Timer";
import {Renderer} from "./Renderer";
import {InputManager} from "./InputManager";
import {Player} from "./entities/Player";
import {GameObject} from "./GameObject";
import {Grid} from "./entities/Grid";
import {GameState} from "./GameState";
import NetworkService from "./NetworkService";
import {EventTypes, serverPlayerMoving} from "../shared/net/Events";
import {MOVEMENT_KEYS} from "../shared/Keys";
import {KeyToDirection} from "./Utils";
import "rxjs/add/operator/retryWhen";
import "rxjs/add/operator/retry";
import "rxjs/add/operator/delay";
import {ServerPlayerConnectedPayload, ServerConnectionEstablishedPayload} from "../shared/net/Payloads";
import {RandomChoice} from "../shared/Math";
import {PLAYER_COLORS} from "../shared/Colors";

export const ObjectId = {
    Player: "myPlayer"
};

export class Engine {
    private static netRetryDelay:number = 500;
    private static keyboardInputDelay:number = 150;
    private _objects: Map<string, GameObject> = new Map<string, GameObject>();
    private timer: Timer;
    private _renderer: Renderer;
    private _inputManager: InputManager;
    private _net: NetworkService;
    private _gameState: GameState;
    private offline = false;

    constructor(renderer: Renderer, input: InputManager, net: NetworkService) {
        this._renderer = renderer;
        this._inputManager = input;
        this._net = net;
        this.constructScene();
    }

    constructScene(): void {
        this._objects.set("grid", new Grid());
    }

    run() {
        this.timer = new Timer();
        this._gameState = new GameState();

        if (!this.offline) {
            this._net.connect()
                .retryWhen((errors) => errors.delay(Engine.netRetryDelay))
                .subscribe((event) => {
                    let payload;
                    switch (event.type) {
                        case EventTypes.SERVER_CONNECTION_ESTABLISHED:
                            payload = <ServerConnectionEstablishedPayload> event.payload;
                            let player = new Player(payload.position, RandomChoice(PLAYER_COLORS));
                            this._gameState.map = payload.state.mapState;
                            this._gameState.myId = payload.playerID;
                            this._objects.set(ObjectId.Player, player);
                            this.start();
                            break;
                        case EventTypes.SERVER_PLAYER_CONNECTED:
                            payload = <ServerPlayerConnectedPayload> event.payload;
                            this._objects.set('player-' + payload.playerID, player);
                            break;
                    }
                });
        } else {
            this._objects.set(ObjectId.Player, new Player({x: 0, y: 0}, RandomChoice(PLAYER_COLORS)));
            this.start();
        }
    }

    get objects(): Map<string, GameObject> {
        return this._objects;
    }

    get renderer(): Renderer {
        return this._renderer;
    }

    get inputManager(): InputManager {
        return this._inputManager;
    }

    private start(): void {
        this.buildScene();
        this._renderer.init();
        this._inputManager.bind();
        this._inputManager.subscribe((o) =>
            o.filter(e => MOVEMENT_KEYS.indexOf(e.keyCode) !== -1 && e.type == 'keydown')
            .debounceTime(Engine.keyboardInputDelay)
            .subscribe((e => {
                this._net.send(serverPlayerMoving({
                    playerID: this._net.connectionInfo.clientID,
                    origin: {x: this._gameState.player.position.x, y: this._gameState.player.position.y},
                    direction: KeyToDirection(e.keyCode)
                }))
            }))
        );
        this._gameState.init(this);
        this._renderer.requestAnimationFrame(() => this.frame());
    }

    private buildScene(): void {
        this._objects.forEach(gameObject => gameObject.init(this));
    }

    private update(delta: number): void {
        this._objects.forEach((gameObject) => {
            gameObject.update(delta)
        });
    }

    private render(delta: number): void {
        this.renderer.context.clearRect(0, 0, this.renderer.width, this.renderer.height);
        this._objects.forEach((gameObject) => {
            gameObject.render(delta)
        });
    }

    private frame(): void {
        this.timer.start();
        while (this.timer.delta > Timer.rate) {
            this.timer.tick();
            this.update(this.timer.delta);
        }
        this.render(this.timer.delta);
        this.timer.end();
        this._renderer.requestAnimationFrame(() => this.frame());
    }
}
