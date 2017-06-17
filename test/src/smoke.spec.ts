'use strict';
import {MapGenerator} from "../../src/shared/map/MapGenerator";


describe('SmokeTest', function () {
    it('works', function () {
        let mapGenerator = new MapGenerator();
        let map = mapGenerator.generate(11, 15);

        return 1 + 1 === 2
    })
});


// {action: “move”, start: {x: 1,y: 2}, direction: 1}