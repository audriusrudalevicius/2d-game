import {Engine} from "../Engine";
import {GameObject} from "../GameObject";
import {BLOCK_SIZE_H, BLOCK_SIZE_W} from "../Constants";

export class Grid implements GameObject {
    private dx:number = BLOCK_SIZE_H;
    private dy:number = BLOCK_SIZE_W;
    private x:number = 0;
    private y:number = 0;
    private w:number = 1000;
    private h:number = 1000;
    private xy:number = 20;
    private context:CanvasRenderingContext2D;

    init(engine:Engine):void {
        this.context = engine.renderer.context;
    }

    update(delta:number):void {

    }
    render(delta:number):void {
        this.context.lineWidth = 1;
        this.context.beginPath();
        while (this.y < this.h) {
            this.y = this.y + this.dy;
            this.context.moveTo(this.x, this.y);
            this.context.lineTo(this.w, this.y);
            this.context.stroke();

            this.xy += 20;
        }

        this.y =0;
        this.xy =10;
        while (this.x < this.w) {
            this.x = this.x + this.dx;
            this.context.moveTo(this.x, this.y);
            this.context.lineTo(this.x,this.h);
            this.context.stroke();

            this.xy+=20;
        }
    }
}

