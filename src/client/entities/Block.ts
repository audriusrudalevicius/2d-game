import {BLOCK_TYPE} from "../../shared/BlockType";
import {Engine} from "../Engine";
import {GameObject} from "../GameObject";

export class Block implements GameObject {
    private type:number;
    private w:number = 40;
    private h:number = 40;
    private map = [
        [1, 0, 0],
        [2, 0, 0],
        [2, 1, 0],
    ];
    private context:CanvasRenderingContext2D;


    init(engine:Engine):void {
        this.context = engine.renderer.context;
    }

    update(delta:number):void {

    }

    render() {
        for (let i = 0; i < this.map.length; i++ ){
            let mapRow = this.map[i];

            for (let j = 0; j < mapRow.length; j++ ) {
                switch (this.type) {
                    case BLOCK_TYPE.EMPTY:
                        this.context.beginPath();
                        this.context.rect(this.w * j , this.h * i, this.w, this.h);
                        this.context.fillStyle = '#ffffff';
                        this.context.fill();
                        this.context.closePath();
                        this.context.stroke();
                        return;
                    case BLOCK_TYPE.SOLID:
                        this.context.beginPath();
                        this.context.fillStyle = '#000000';
                        this.context.rect(this.w * j , this.h * i, this.w, this.h);
                        this.context.fill();
                        this.context.closePath();
                        this.context.stroke();
                        return;
                    case BLOCK_TYPE.BRICK:
                        this.context.beginPath();
                        this.context.rect(this.w * j , this.h * i, this.w, this.h);
                        this.context.fillStyle = '#841F27';
                        this.context.fill();
                        this.context.closePath();
                        this.context.stroke();
                        return;
                }
            }
        }
    }
    unload(): void {
    }

    toString(): string {
        return 'Blocks';
    }
}
