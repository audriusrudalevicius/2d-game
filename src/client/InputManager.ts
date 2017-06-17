import {KEY} from "../shared/Keys";
import {Callback} from "awesome-typescript-loader/dist/paths-plugin";

export interface InputListener {
    (): void;
}

export class InputManager {
    listeners:Map<number, Array<Callback>> = new Map<number, Array<Callback>>();
    movingUp: boolean;
    movingDown: boolean;
    movingLeft: boolean;
    movingRight: boolean;
    placingBomb: boolean;

    constructor(private canvas: HTMLCanvasElement, private document:Document) {
    }

    private downListener =  (e: KeyboardEvent) => {
        this.onKey(e.keyCode, true);
    };
    private upListener = (e: KeyboardEvent) => {
        this.onKey(e.keyCode, false);
    };

    addListener(key:number, listener:InputListener)
    {
        let listeners = this.listeners.get(key);
        if (!listeners) {
            listeners = [];
            this.listeners.set(key, listeners);
        }
        listeners.push(listener);
    }

    removeAllListeners()
    {
        this.listeners = new Map<number, Array<InputListener>>();
    }

    bind() {
        this.document.addEventListener('keydown', this.downListener);
        this.document.addEventListener('keyup', this.upListener);
    }

    unbind() {
        this.document.removeEventListener('keydown', this.downListener);
        this.document.removeEventListener('keyup', this.upListener);
    }

    onKey(keycode: number, down: boolean) {
        switch (keycode) {
            case KEY.SPACE:
                this.placingBomb = down;
                break;
            case KEY.UP:
                this.movingUp = down;
                break;
            case KEY.DOWN:
                this.movingDown = down;
                break;
            case KEY.RIGHT:
                this.movingRight = down;
                break;
            case KEY.LEFT:
                this.movingLeft = down;
                break;
        }
        let listeners = this.listeners.get(keycode);
        if (listeners) {
            listeners.forEach(l => l());
        }
    }
}
