import {Timer} from "./Timer";
import {Renderer} from "./Renderer";
import {InputManager} from "./InputManager";
import {Player} from "./entities/Player";
import {GameObject} from "./GameObject";
import {Grid} from "./entities/Grid";
import {GameState} from "./GameState";
import NetworkService from "./NetworkService";
import {EventTypes, serverPlayerMoving} from "../shared/logic/Events";
import {KEY, MOVEMENT_KEYS} from "../shared/Keys";
import {KeyToDirection} from "./Utils";
import "rxjs/add/operator/retryWhen";
import "rxjs/add/operator/retry";
import "rxjs/add/operator/delay";

export const ObjectId = {
    Player: "myPlayer"
};

export class Engine {
    private _objects: Map<string, GameObject> = new Map<string, GameObject>();
    private timer: Timer;
    private _renderer: Renderer;
    private _inputManager: InputManager;
    private _net: NetworkService;
    private _gameState: GameState;
    private offline = true;
    private stated = false;

    constructor(renderer: Renderer, input: InputManager, net: NetworkService) {
        this._renderer = renderer;
        this._inputManager = input;
        this._net = net;
        this.bindListeners();
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
                .retryWhen((errors) => errors.delay(500))
                .subscribe((event) => {
                    switch (event.type) {
                        case EventTypes.SERVER_CONNECTION_ESTABLISHED:
                            this._gameState.map = event.payload.state.mapState;
                            this._objects.set(ObjectId.Player, new Player());
                            this.start();
                            break;
                    }
                });
        } else {
            this._objects.set(ObjectId.Player, new Player());
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
        this._gameState.init(this);
        this.update(0);
        this.render(0);
        this._renderer.requestAnimationFrame(() => this.frame());
        this.stated = true;
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
        while (this.timer.delta > this.timer.rate) {
            this.timer.tick();
            this.update(this.timer.delta);
        }
        this.render(this.timer.delta);
        this.timer.end();
        this._renderer.requestAnimationFrame(() => this.frame());
    }

    private bindListeners() {
        if (!this.offline) {
            MOVEMENT_KEYS.forEach((keycode) => {
                this.inputManager.addListener(KEY.RIGHT, () => {
                    if (!this.stated) {
                        return;
                    }
                    this._net.send(serverPlayerMoving({
                        playerID: this._net.connectionInfo.clientID,
                        origin: {x: this._gameState.player.x, y: this._gameState.player.y},
                        direction: KeyToDirection(keycode)
                    }))
                });
            });
        }
    }
}
