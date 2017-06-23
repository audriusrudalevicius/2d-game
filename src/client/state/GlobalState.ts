import {
    AddNewPlayer, CreateGameState, GameState, MovePlayerPosition, RemovePlayer,
    SetInitState
} from "./game/GameState";
import {
    ConnectedToServerAction, EventTypes, PlayerJoinsAction, PlayerLeavesAction, PlayerMovedAction,
    PlayerMovingAction
} from "../../shared/net/Events";

export interface StateInterface {
    gameState: GameState;
}

export const CreateState = ():StateInterface => {
    return {
        gameState: CreateGameState()
    };
};

export const applyGameState = (state: StateInterface, action: StateActions):StateInterface => {
    switch (action.type) {
        case EventTypes.SERVER_CONNECTION_ESTABLISHED:
            return {...state, gameState: SetInitState(state.gameState, action as ConnectedToServerAction)};
        case EventTypes.SERVER_PLAYER_CONNECTED:
            return {...state, gameState: AddNewPlayer(state.gameState, action as PlayerJoinsAction)};
        case EventTypes.SERVER_PLAYER_DISCONNECTED:
            return {...state, gameState: RemovePlayer(state.gameState, action as PlayerLeavesAction)};
        case EventTypes.SERVER_PLAYER_MOVED:
            return {...state, gameState: MovePlayerPosition(state.gameState, action as PlayerMovedAction)};
        default:
            return state;
    }
};

export type StateActions = ConnectedToServerAction | PlayerJoinsAction | PlayerLeavesAction | PlayerMovingAction | PlayerMovedAction;
