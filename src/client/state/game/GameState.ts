import {ServerConnectionEstablishedPayload} from "../../../shared/net/Payloads";
import {
    ConnectedToServerAction,
    PlayerJoinsAction,
    PlayerLeavesAction,
    PlayerMovedAction
} from "../../../shared/net/Events";
import {DirectionToPos} from "../../Utils";

export interface GameState extends ServerConnectionEstablishedPayload {

}

export const CreateGameState = (state: GameState = null): GameState => {
    return {
        connectionInfo: undefined,
        player: {playerID: undefined, position: {x: 0, y: 0}},
        map: [],
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
    if (!action.payload.player) {
        throw new Error('Invalid payload!');
    }
    return <GameState>{
        ...state,
        players: [...state.players, action.payload.player]
    };
};

export const RemovePlayer = (state: GameState, action: PlayerLeavesAction): GameState => {
    return <GameState>{
        ...state,
        players: [...state.players.filter(p => p.playerID !== action.payload.playerID)]
    };
};

export const MovePlayerPosition = (state: GameState, action: PlayerMovedAction): GameState => {
    if (action.payload.playerID === state.player.playerID) {
        const newPosition = DirectionToPos(state.player.position, action.payload.direction);
        return {
            ...state,
            player: {...state.player, position: newPosition}
        };
    }

    const player = state.players.find(p => p.playerID === action.payload.playerID);
    const newPosition = DirectionToPos(player.position, action.payload.direction);
    return {
        ...state,
        players: state.players.map(player => player.playerID === action.payload.playerID
            ? {...player, position: newPosition}
            : player
        )
    };
};


