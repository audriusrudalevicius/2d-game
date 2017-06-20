import {KEY} from "../shared/Keys";
import * as Rx from "rxjs";

export class InputManager {
    movingUp: boolean;
    movingDown: boolean;
    movingLeft: boolean;
    movingRight: boolean;
    placingBomb: boolean;

    private actionsBound: Array<Rx.Subscription> = [];
    private keyActions:Rx.Observable<KeyboardEvent>;

    constructor(private canvas: HTMLCanvasElement, private document: Document) {
    }

    subscribe(callback:(o:Rx.Observable<KeyboardEvent>) => Rx.Subscription) {
        this.actionsBound.push(callback(this.keyActions));
    }

    bind() {
        let keyDowns = Rx.Observable.fromEvent(this.document, 'keydown');
        let keyUps = Rx.Observable.fromEvent(this.document, 'keyup');
        this.keyActions = Rx.Observable
            .merge<KeyboardEvent>(keyDowns, keyUps)
            .groupBy((e: KeyboardEvent) => e.keyCode)
            .map(group => group.distinctUntilChanged(null, (e: KeyboardEvent) => e.type))
            .mergeAll();

        this.actionsBound.push(
            this.keyActions.subscribe((e: KeyboardEvent) => {
                this.onKey(e.keyCode, e.type === 'keyup');
            })
        );
    }

    unbind() {
        this.actionsBound.forEach(action => action.unsubscribe());
    }

    onKey(keycode: number, down: boolean) {
        switch (keycode) {
            case KEY.SPACE:
                this.placingBomb = down;
                break;
            case KEY.UP:
                this.movingUp = down;
                break;
            case KEY.DOWN:
                this.movingDown = down;
                break;
            case KEY.RIGHT:
                this.movingRight = down;
                break;
            case KEY.LEFT:
                this.movingLeft = down;
                break;
        }
    }
}
