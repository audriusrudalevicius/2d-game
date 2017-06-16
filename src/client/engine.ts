const KEY = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    SPACE: 32,
    ESC: 27
};

class Engine {
    private canvas: HTMLCanvasElement;
    private objects: Set<GameObject> = new Set<GameObject>();
    private timer: Timer;
    private renderer: Renderer;
    private inputManager: InputManager;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.renderer = new Renderer(canvas.getContext('2d'));
        this.inputManager = new InputManager();
    }

    start() {
        this.timer = new Timer();
        this.renderer.init();
        this.inputManager.bind(window.document, this.canvas);
        this.update(0);
        this.render(0);
        requestAnimationFrame(() => this.frame());
    }

    private update(delta: number): void {

    }

    private render(delta: number): void {

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
    private context: CanvasRenderingContext2D;

    constructor(context: CanvasRenderingContext2D) {
        this.context = context;
    }

    public init() {
        this.context.fillStyle = '#ffca77';
        this.context.strokeStyle = '#000000';
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
    movingUp: boolean;
    movingDown: boolean;
    movingLeft: boolean;
    movingRight: boolean;
    placeingBomb: boolean;

    private downListener = function (e: KeyboardEvent) {
        this.onKey(e.keyCode, true);
    };
    private upListener = function (e: KeyboardEvent) {
        this.onKey(e.keyCode, true);
    };

    bind(doc: HTMLDocument, canvas: HTMLCanvasElement) {
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
    update(delta: number): void;
    render(delta: number): void;
}
