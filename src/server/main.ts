import Server from './Server';
import {GameState} from "./GameState";
import {MapGenerator} from "../shared/map/MapGenerator";

const gameState: GameState = new GameState(new MapGenerator);
gameState.start();

let instance = new Server(gameState);
instance.listen();
