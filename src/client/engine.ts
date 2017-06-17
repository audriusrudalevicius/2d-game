const KEY = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    SPACE: 32,
    ESC: 27
};

class Engine {
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

class Renderer {
    private _context: CanvasRenderingContext2D;

    constructor(context: CanvasRenderingContext2D) {
        this._context = context;
    }

    public init() {
    }

    get context(): CanvasRenderingContext2D {
        return this._context;
    }
}

class Timer {
    private last: number = 0;
    private now: number;
    public delta: number;
    public readonly rate = 1 / 60;

    private timestamp(): number {
        return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
    }

    public start() {
        this.now = this.timestamp();
        this.delta = Math.min(1, (this.now - this.last) / 1000);
    }

    public end() {
        this.last = this.now;
    }
}

class InputManager {
    private canvas: HTMLCanvasElement;

    movingUp: boolean;
    movingDown: boolean;
    movingLeft: boolean;
    movingRight: boolean;
    placeingBomb: boolean;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
    }

    private downListener = function (e: KeyboardEvent) {
        this.onKey(e.keyCode, true);
    };
    private upListener = function (e: KeyboardEvent) {
        this.onKey(e.keyCode, true);
    };

    bind() {
        document.addEventListener('keydown', this.downListener);
        document.addEventListener('keyup', this.upListener);
    }

    unbind() {
        document.removeEventListener('keydown', this.downListener);
        document.removeEventListener('keyup', this.upListener);
    }

    onKey(keycode: number, down: boolean) {
        switch (keycode) {
            case KEY.RIGHT:
                this.movingRight = down;
                return;
            case KEY.LEFT:
                this.movingLeft = down;
                return;
        }
    }
}

interface GameObject {
    init(engine:Engine):void;
    update(delta: number): void;
    render(delta: number): void;
}


class Player implements GameObject {
    private x:number = 0;
    private y:number = 0;
    private context:CanvasRenderingContext2D;

    init(engine:Engine):void {
        this.context = engine.renderer.context;
    }

    update(delta:number):void {

    }
    render(delta:number):void {
        this.context.fillStyle = "#000000";
        this.context.beginPath();
        this.context.moveTo(this.x, this.y + 5);
        this.context.stroke();
    }
}
