'use strict';
import {Engine} from "../../src/client/Engine";
import {InputManager} from "../../src/client/InputManager";
import NetworkService from "../../src/client/NetworkService";
import {Renderer} from "../../src/client/Renderer";
import {MapGenerator} from "../../src/shared/map/MapGenerator";
import {GameState as ServerGameState} from "../../src/server/GameState";
import Server from "../../src/server/Server";

const mockCanvas = {
    fillRect: function () {
    },
    clearRect: function () {
    },
    getImageData: function (x: any, y: any, w: any, h: any) {
        return {
            data: new Array(w * h * 4)
        };
    },
    putImageData: function () {
    },
    createImageData: (): any => [],
    setTransform: function () {
    },
    drawImage: function () {
    },
    save: function () {
    },
    fillText: function () {
    },
    restore: function () {
    },
    beginPath: function () {
    },
    moveTo: function () {
    },
    lineTo: function () {
    },
    closePath: function () {
    },
    stroke: function () {
    },
    translate: function () {
    },
    scale: function () {
    },
    rotate: function () {
    },
    arc: function () {
    },
    fill: function () {
    },
};

const mockDocument = {
    addEventListener: () => {
    },
    removeEventListener: () => {
    }
};

const mockWindow = {
    called: false,
    requestAnimationFrame: (c: any) => {
        mockWindow.called = !mockWindow.called;
        if (!mockWindow.called) c();
    }
};


describe('SmokeTest', function () {
    it('client', function () {
        const input = new InputManager(<any> mockDocument, <any> mockDocument);
        const renderer = new Renderer(<any> mockCanvas, 800, 600, <any> mockWindow);
        const networkService = new NetworkService();
        const engine = new Engine(renderer, input, networkService);

        engine.run();
    });
    it('server', function () {
        const mapGenerator = new MapGenerator();
        const gameState = new ServerGameState(mapGenerator);
        const server = new Server(gameState);
    })
});
