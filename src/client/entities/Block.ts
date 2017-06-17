import {BLOCK_TYPE} from "../../shared/BlockType";
import {Engine} from "../Engine";
import {GameObject} from "../GameObject";

export class Block implements GameObject {
    private type:number;
    private x:number = 50;
    private y:number = 50;
    private w:number = 50;
    private h:number = 50;
    private context:CanvasRenderingContext2D;

    init(engine:Engine):void {
        this.context = engine.renderer.context;
    }

    update(delta:number):void {

    }

    render() {
        switch (this.type) {
            case BLOCK_TYPE.EMPTY:
                this.context.beginPath();
                this.context.rect(this.x, this.y, this.w, this.h);
                this.context.fillStyle = '#ffffff';
                this.context.fill();
                this.context.closePath();
                this.context.stroke();
                return;
            case BLOCK_TYPE.SOLID:
                this.context.beginPath();
                this.context.rect(this.x, this.y, this.w, this.h);
                this.context.fillStyle = '#000000';
                this.context.fill();
                this.context.closePath();
                this.context.stroke();
                return;
            case BLOCK_TYPE.BRICK:
                this.context.beginPath();
                this.context.rect(this.x, this.y, this.w, this.h);
                this.context.fillStyle = '#841F27';
                this.context.fill();
                this.context.closePath();
                this.context.stroke();
                return;
        }
    }
}
