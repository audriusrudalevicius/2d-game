import {Engine} from "../Engine";
import {GameObject} from "../GameObject";
import {BLOCK_SIZE_H, BLOCK_SIZE_W, PLAYER_SIZE} from "../Constants";
import {WorldToCanvas} from "../Utils";
import {InputManager} from "../InputManager";

export class Player implements GameObject {
    private colors: Array<string> = [];
    public x: number = 1;
    public y: number = 1;
    private context: CanvasRenderingContext2D;
    private inputManager: InputManager;

    init(engine: Engine): void {
        this.context = engine.renderer.context;
        this.inputManager = engine.inputManager;
    }

    update(delta: number): void {
        if (this.inputManager.movingRight) {
            this.x += 1;
        } else if (this.inputManager.movingUp) {
            if (this.y == 0) {
                return;
            }
            this.y -= 1;
        } else if (this.inputManager.movingDown) {
            this.y += 1;
        } else if (this.inputManager.movingLeft) {
            if (this.x == 0) {
                return;
            }
            this.x -= 1;
        }
    }

    render(delta: number): void {
        const coords = WorldToCanvas(this.x, this.y);
        this.context.fillStyle = "#000000";
        this.context.beginPath();
        this.context.arc(coords.x + BLOCK_SIZE_W / 2, coords.y + BLOCK_SIZE_H / 2, PLAYER_SIZE / 2, 0, 2 * Math.PI);
        this.context.fill();
        this.context.stroke();
        this.context.closePath();
        this.context.stroke();

        this.context.fillText('x:' + this.x + ' ' + 'y:' + this.y, 10, 10);
    }
}
