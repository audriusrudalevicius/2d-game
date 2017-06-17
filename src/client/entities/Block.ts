import {BLOCK_TYPE} from "../../shared/block";
export class Block {
    private type:number;
    private x:number;
    private y:number;

    render() {
        switch (this.type) {
            case BLOCK_TYPE.EMPTY:
                return;
            case BLOCK_TYPE.SOLID:
                return;
        }
    }
}
