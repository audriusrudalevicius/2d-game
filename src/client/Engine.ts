import {Timer} from "./Timer";
import {Renderer} from "./Renderer";
import {InputManager} from "./InputManager";
import {Player} from "./Player";
import {GameObject} from "./GameObject";

export class Engine {
    private _objects: Map<string, GameObject> = new Map<string, GameObject>();
    private timer: Timer;
    private _renderer: Renderer;
    private _inputManager: InputManager;

    constructor(renderer: Renderer, input: InputManager) {
        this._renderer = renderer;
        this._inputManager = input;
        this.constructScene();
    }

    constructScene():void {
        this._objects.set("myPlayer", new Player());
    }

    start() {
        this.timer = new Timer();
        this.buildScene();
        this._renderer.init();
        this._inputManager.bind();
        this.update(0);
        this.render(0);
        requestAnimationFrame(() => this.frame());
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

    private buildScene(): void {
        this._objects.forEach(gameObject => gameObject.init(this));
    }

    private update(delta: number): void {
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
            this.update(this.timer.delta);
        }
        this.render(this.timer.delta);
        this.timer.end();
    }
}
