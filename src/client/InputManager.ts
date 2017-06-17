import {KEY} from "../shared/keys";

export class InputManager {
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