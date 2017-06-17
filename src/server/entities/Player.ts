import {PlayerInterface as PlayerInterface, PositionInterface} from "../../shared/Entities";

export class Player implements PlayerInterface {
    clientID: string;
    name: string;
    position: PositionInterface;
    kills: number;
    suicides: number;

    constructor(playerId: string, startingPosition: PositionInterface) {
        this.clientID = playerId;
        this.name = playerId;
        this.position = startingPosition;
        this.kills = 0;
        this.suicides = 0;
    }
}
