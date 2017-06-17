import {Timer} from "./Timer";
import {Renderer} from "./Renderer";
import {InputManager} from "./InputManager";
import {Player} from "./entities/Player";
import {GameObject} from "./GameObject";
import {Grid} from "./entities/Grid";
import NetworkService from "./NetworkService";

export class Engine {
    private _objects: Map<string, GameObject> = new Map<string, GameObject>();
    private timer: Timer;
    private _renderer: Renderer;
    private _inputManager: InputManager;
    private _net: NetworkService;
    private offline = true;

    constructor(renderer: Renderer, input: InputManager, net:NetworkService) {
        this._renderer = renderer;
        this._inputManager = input;
        this._net = net;
        this.constructScene();
    }

    constructScene():void {
        this._objects.set("myPlayer", new Player());
        this._objects.set("myGrid", new Grid());
    }

    run() {
        this.timer = new Timer();
        if (!this.offline) {
            this._net.connect();
            // todo: start after connection
        } else {
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
        this.update(0);
        this.render(0);
        requestAnimationFrame(() => this.frame());
    }

    private buildScene(): void {
        this._objects.forEach(gameObject => gameObject.init(this));
    }

    private update(delta: number): void {
        this.inoutEvents();
        this._objects.forEach((gameObject) => {
            gameObject.update(delta)
        });
    }

    private render(delta: number): void {
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
        requestAnimationFrame(() => this.frame());
    }

    private inoutEvents() {

        const player = <Player> this._objects.get('myPlayer');
        if (this.inputManager.movingLeft) {

        }
    }
}
