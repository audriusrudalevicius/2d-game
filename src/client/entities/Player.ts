import {Engine} from "../Engine";
import {GameObject} from "../GameObject";
import {BLOCK_SIZE_H, BLOCK_SIZE_W, PLAYER_SIZE} from "../Constants";
import {WorldToCanvas} from "../Utils";
import {PositionInterface} from "../../shared/Entities";

export class Player implements GameObject {
    private color:string;
    public position:PositionInterface;
    private context: CanvasRenderingContext2D;

    constructor(position: PositionInterface, color:string) {
        this.position = position;
        this.color = color;
    }

    init(engine: Engine): void {
        this.context = engine.renderer.context;
    }

    update(delta: number): void {

    }

    render(delta: number): void {
        const coords:PositionInterface = WorldToCanvas(this.position.x, this.position.y);
        this.context.fillStyle = this.color;
        this.context.beginPath();
        this.context.arc(coords.x + BLOCK_SIZE_W / 2, coords.y + BLOCK_SIZE_H / 2, PLAYER_SIZE / 2, 0, 2 * Math.PI);
        this.context.fill();
        this.context.stroke();
        this.context.closePath();
        this.context.stroke();

        this.context.fillText('x:' + this.position.x + ' ' + 'y:' + this.position.y, 10, 10);
    }

    unload(): void {
    }
}
