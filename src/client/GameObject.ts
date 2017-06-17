import {Engine} from "./Engine";

export interface GameObject {
    init(engine:Engine):void;
    update(delta: number): void;
    render(delta: number): void;
}
