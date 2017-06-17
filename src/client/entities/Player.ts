import {Engine} from "../Engine";
import {GameObject} from "../GameObject";
import {BLOCK_SIZE_H, PLAYER_SIZE, BLOCK_SIZE_W} from "../Constants";
import {WorldToCanvas} from "../Utils";

export class Player implements GameObject {
    private colors:Array<string> = [];
    private x:number = 1;
    private y:number = 1;
    private context:CanvasRenderingContext2D;

    init(engine:Engine):void {
        this.context = engine.renderer.context;
    }

    update(delta:number):void {

    }
    render(delta:number):void {
        const coords = WorldToCanvas(this.x, this.y);
        this.context.fillStyle = "#000000";
        this.context.beginPath();
        this.context.arc(coords.x + BLOCK_SIZE_W / 2, coords.y + BLOCK_SIZE_H / 2, PLAYER_SIZE / 2, 0, 2 * Math.PI);
        this.context.fill();
        this.context.closePath();
        this.context.stroke();
    }
}
