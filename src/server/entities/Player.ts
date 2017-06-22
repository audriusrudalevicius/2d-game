import {PlayerInterface as PlayerInterface, PositionInterface} from "../../shared/Entities";

export class Player implements PlayerInterface {
    playerID: string;
    name: string;
    position: PositionInterface;
    kills: number;
    suicides: number;

    constructor(playerId: string, startingPosition: PositionInterface) {
        this.playerID = playerId;
        this.name = playerId;
        this.position = startingPosition;
        this.kills = 0;
        this.suicides = 0;
    }
}
