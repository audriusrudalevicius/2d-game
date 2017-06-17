import {KEY} from "../shared/Keys";

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

    private downListener =  (e: KeyboardEvent) => {
        this.onKey(e.keyCode, true);
    };
    private upListener = (e: KeyboardEvent) => {
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
