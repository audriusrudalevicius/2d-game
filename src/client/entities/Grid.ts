import {Engine} from "../Engine";
import {GameObject} from "../GameObject";

export class Grid implements GameObject {
    private dx:number = 50;
    private dy:number = 50;
    private x:number = 0;
    private y:number = 0;
    private w:number = 1400;
    private h:number = 700;
    private xy:number = 10;
    private context:CanvasRenderingContext2D;

    init(engine:Engine):void {
        this.context = engine.renderer.context;
    }

    update(delta:number):void {

    }
    render(delta:number):void {
        this.context.lineWidth = 1;


        while (this.y < this.h) {
            this.y = this.y + this.dy;
            this.context.beginPath();
            this.context.moveTo(this.x, this.y);
            this.context.lineTo(this.w, this.y);
            this.context.closePath();
            this.context.stroke();

            this.xy += 10;
        }

        this.y =0;
        this.xy =10;
        while (this.x < this.w) {
            this.x = this.x + this.dx;
            this.context.beginPath();
            this.context.moveTo(this.x, this.y);
            this.context.lineTo(this.x,this.h);
            this.context.closePath();
            this.context.stroke();

            this.xy+=10;
        }


    }
}

