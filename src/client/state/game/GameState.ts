import {ServerConnectionEstablishedPayload} from "../../../shared/net/Payloads";
import {ConnectedToServerAction, PlayerJoinsAction} from "../../../shared/net/Events";

export interface GameState extends ServerConnectionEstablishedPayload {

}

export const CreateGameState = (state:GameState = null): GameState => {
    return {
        connectionInfo: undefined,
        position: {x: 0, y: 0},
        map: [],
        playerID: undefined,
        players: [],
        bombs: [],
        ...state
    }
};

export const SetInitState = (state: GameState, action: ConnectedToServerAction): GameState => {
    return {
        ...state,
        ...action.payload
    } as GameState;
};

export const AddNewPlayer = (state: GameState, action: PlayerJoinsAction): GameState => {
    return <GameState>{
        ...state,
        players: [...state.players, {playerID: action.payload.playerID, position: action.payload.position}]
    };
};


