import {Player as PlayerInterface, Position} from "../../shared/Entities";

export class Player implements PlayerInterface {
    clientID: string;
    name: string;
    position: Position;
    kills: number;
    suicides: number;

    constructor(playerId: string, startingPosition: Position) {
        this.clientID = playerId;
        this.name = playerId;
        this.position = startingPosition;
        this.kills = 0;
        this.suicides = 0;
    }
}
