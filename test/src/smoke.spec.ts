'use strict';
import {GameState} from "../../src/server/GameState";


describe('SmokeTest', function () {
    it('works', function () {
        const gameState= new GameState();

        const test = gameState.generateMap(11, 15);

        return 1 + 1 === 2
    })
});


// {action: “move”, start: {x: 1,y: 2}, direction: 1}