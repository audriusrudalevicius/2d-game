import {AddNewPlayer, CreateGameState, GameState, SetInitState} from "./game/GameState";
import {
    ConnectedToServerAction, EventTypes, PlayerJoinsAction, PlayerMovedAction,
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
            return {...state, gameState: AddNewPlayer(state.gameState, action as ConnectedToServerAction)};
        default:
            return state;
    }
};

export type StateActions = ConnectedToServerAction | PlayerJoinsAction | PlayerMovingAction | PlayerMovedAction;
