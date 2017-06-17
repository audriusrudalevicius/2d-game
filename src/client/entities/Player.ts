import {Engine} from "../Engine";
import {GameObject} from "../GameObject";

export class Player implements GameObject {
    private x:number = 50;
    private y:number = 0;
    private context:CanvasRenderingContext2D;

    init(engine:Engine):void {
        this.context = engine.renderer.context;
    }

    update(delta:number):void {

    }
    render(delta:number):void {
        this.context.fillStyle = "#000000";
        this.context.arc(this.x, this.y + 50, 50, 0, 2 * Math.PI, false);
        this.context.fill();
        this.context.stroke();
    }
}