import {Player} from "./entities/Player";
import {PlayerInterface} from "../shared/Entities";
import {Engine, ObjectId} from "./Engine";

export class GameState {
    map:Array<Array<number>>;
    players:Array<PlayerInterface>;
    playerController: PlayerController;
    player:Player;

    init(engine:Engine):void {
        this.player = <Player> engine.objects.get(ObjectId.Player);
    }
}

interface PlayerController {
    position: {x: number, y: number};
}
