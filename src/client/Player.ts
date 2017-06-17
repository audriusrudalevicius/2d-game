import {Engine} from "./Engine";
import {GameObject} from "./GameObject";

export class Player implements GameObject {
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
        this.context.moveTo(this.x, this.y + 50);
        this.context.stroke();
    }
}
