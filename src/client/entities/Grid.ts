import {Engine} from "../Engine";
import {GameObject} from "../GameObject";
import {BLOCK_SIZE_H, BLOCK_SIZE_W} from "../Constants";

export class Grid implements GameObject {
    private lineWidth = 1;
    private maxX:number = BLOCK_SIZE_W * 24;
    private maxY:number = BLOCK_SIZE_W * 28;
    private spaceX:number = BLOCK_SIZE_W;
    private spaceY:number = BLOCK_SIZE_H;
    private startX = 1;
    private startY = 1;
    private padding = 0;
    private context:CanvasRenderingContext2D;

    init(engine:Engine):void {
        this.context = engine.renderer.context;
    }

    update(delta:number):void {

    }
    render(delta:number):void {
        this.context.beginPath();
        this.context.lineWidth = this.lineWidth;
        let border = 0;
        let extraLen = 0;
        if (this.lineWidth == 1) {
            border = 0.5;
            extraLen = 2;
        }
        let endX = this.maxX + this.padding + extraLen;
        for (let x = this.startX; x < endX; x+= this.spaceX) {
            this.context.moveTo(x + border + this.padding, this.startX + this.padding);
            this.context.lineTo(x + border + this.padding, this.maxX + this.padding);
        }
        let endY = this.maxY + this.padding + extraLen;
        for (let y = this.startY; y < endY; y+= this.spaceY) {
            this.context.moveTo(this.startY + this.padding, y + border + this.padding);
            this.context.lineTo(this.maxY + this.padding, y + border + this.padding);
        }
        this.context.closePath();
        this.context.stroke();
    }
}

