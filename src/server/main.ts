import Server from "./Server";
import {GameState} from "./GameState";
import {MapGenerator} from "./map/MapGenerator";

const gameState: GameState = new GameState(new MapGenerator);
gameState.start();

let instance = new Server(gameState);
instance.listen();

const BUILD_ID = process.env.NODE_ENV !== 'development' ? process.env.CIRCLE_BUILD_NUM || 'dev' : 'dev';
console.log('Started! Build:' + BUILD_ID);
