import {Timer} from "./Timer";
import {Renderer} from "./Renderer";
import {InputManager} from "./InputManager";
import {Player} from "./entities/Player";
import {Grid} from "./entities/Grid";
import NetworkService from "./NetworkService";
import {clientPlayerMoving, EventTypes} from "../shared/net/Events";
import {MOVEMENT_KEYS} from "../shared/Keys";
import {KeyToDirection} from "./Utils";
import "rxjs/add/operator/retryWhen";
import "rxjs/add/operator/retry";
import "rxjs/add/operator/delay";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/distinctUntilChanged";
import {RandomChoice} from "../shared/Math";
import {PLAYER_COLORS} from "../shared/Colors";
import {GaTrack, TrackPoint} from "./GaTrack";
import {applyGameState, CreateState, StateInterface} from "./state/GlobalState";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {ObjectManager} from "./scene/ObjectManager";

export const ObjectId = {
    Player: "myPlayer"
};

export class Engine {
    private static netRetryDelay: number = 500;
    private static keyboardInputDelay: number = 150;
    private om: ObjectManager;
    private timer: Timer;
    private _renderer: Renderer;
    private _inputManager: InputManager;
    private _net: NetworkService;
    private _state: BehaviorSubject<StateInterface>;
    private offline = false;

    constructor(renderer: Renderer, input: InputManager, net: NetworkService) {
        this._renderer = renderer;
        this._inputManager = input;
        this._net = net;
    }

    constructScene(): void {
        this.om.addObject("grid", new Grid());
    }

    run() {
        GaTrack.TrackTimeOnce(TrackPoint.JS_LOAD);
        this.timer = new Timer();
        this._state = new BehaviorSubject(CreateState());
        this.om = new ObjectManager();
        if (!this.offline) {
            this._net.connect()
                .retryWhen((errors) => errors.delay(Engine.netRetryDelay))
                .subscribe((event) => {
                    console.log('EVENT - ', event);
                    switch (event.type) {
                        case EventTypes.SERVER_CONNECTION_ESTABLISHED:
                            this.start();
                            break;
                    }
                    this._state.next(applyGameState(this._state.getValue(), event));
                });
        } else {
            this.start();
        }
    }

    get objectManager(): ObjectManager {
        return this.om;
    }

    get renderer(): Renderer {
        return this._renderer;
    }

    get inputManager(): InputManager {
        return this._inputManager;
    }

    get state(): StateInterface {
        return this._state.getValue();
    }

    private start(): void {
        GaTrack.TrackTimeOnce(TrackPoint.GAME_CONNECT);
        this._renderer.init();
        this.om.run(this);
        this.constructScene();
        this._inputManager.bind();
        this._inputManager.subscribe((o) =>
            o.filter(e => MOVEMENT_KEYS.indexOf(e.keyCode) !== -1 && e.type == 'keydown')
                .debounceTime(Engine.keyboardInputDelay)
                .subscribe((e => {
                    this._net.send(clientPlayerMoving({
                        playerID: this._net.connectionInfo.clientID,
                        origin: {
                            x: this._state.getValue().gameState.position.x,
                            y: this._state.getValue().gameState.position.y
                        },
                        direction: KeyToDirection(e.keyCode)
                    }))
                }))
        );
        this._state
            .distinctUntilChanged()
            .subscribe((s) => console.log('STATE CHANGE', s));
        this._state
            .distinctUntilChanged((a, b) => a.gameState.position === b.gameState.position)
            .subscribe(
                state => {
                    const exists = this.om.findObject(ObjectId.Player) as Player;
                    if (!exists) {
                        this.om.addObject(ObjectId.Player, new Player(state.gameState.position, RandomChoice(PLAYER_COLORS)));
                        return;
                    }
                    exists.position = state.gameState.position;
                },
                () => this.om.removeObject(ObjectId.Player),
                () => this.om.removeObject(ObjectId.Player)
            );

        this._state
            .distinctUntilChanged((a, b) => {
                return a.gameState.players === b.gameState.players
            })
            .subscribe(
                state => {
                    state.gameState.players.forEach(player => {
                        if (player.playerID === state.gameState.playerID) {
                            return;
                        }
                        const exists = this.om.findObject(player.playerID) as Player;
                        if (!exists) {
                            this.om.addObject(player.playerID, new Player(player.position, RandomChoice(PLAYER_COLORS)))
                            return;
                        }
                        if (typeof player.position === 'undefined') {
                            this.om.removeObject(player.playerID);
                            return;
                        }
                        exists.position = player.position;
                    });
                }
            );
        this._renderer.requestAnimationFrame(() => this.frame());
    }

    private update(delta: number): void {
        this.om.update(delta);
    }

    private render(delta: number): void {
        this.renderer.context.clearRect(0, 0, this.renderer.width, this.renderer.height);
        this.om.render(delta);
    }

    private frame(): void {
        this.timer.start();
        while (this.timer.delta > Timer.rate) {
            this.timer.tick();
            this.update(this.timer.delta);
        }
        this.render(this.timer.delta);
        this.om.cleanUp(this.timer.delta);
        this.timer.end();
        this._renderer.requestAnimationFrame(() => this.frame());
    }
}
