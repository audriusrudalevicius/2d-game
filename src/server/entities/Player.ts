import {PlayerInterface as PlayerInterface, PositionInterface} from "../../shared/Entities";
import {PLAYER_NAMES} from "../../shared/Constants";
import {RandomColor, TakeRandom} from "../../shared/Math";

let Players = PLAYER_NAMES.slice(0);

export class Player implements PlayerInterface {
    playerID: string;
    name: string;
    position: PositionInterface;
    kills: number;
    suicides: number;
    color: string;

    constructor(playerId: string, startingPosition: PositionInterface) {
        this.playerID = playerId;
        this.name = playerId;
        this.position = startingPosition;
        this.kills = 0;
        this.suicides = 0;
        this.color = RandomColor();
        if (Players.length < 1) {
            Players = PLAYER_NAMES.slice(0);
        }
        this.name = TakeRandom(Players);
    }
}
