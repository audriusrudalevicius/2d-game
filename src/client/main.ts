import {DefaultConfig} from "../shared/Params";
import {Engine} from "./Engine";
import {InputManager} from "./InputManager";
import {Renderer} from "./Renderer";
import NetworkService from "./NetworkService";

if (typeof window == "undefined") {
    throw new Error("Run this script in browser.");
}

import 'autotrack';
import 'autotrack/lib/plugins/event-tracker';

const BUILD_ID = window['NODE_ENV'] !== 'development' ? window['CIRCLE_BUILD_NUM'] : 'dev';
const config = typeof window['SHARED_CONFIG'] !== 'undefined' ? window['SHARED_CONFIG'] : DefaultConfig;
const serverURL = config.serverUrl + ':' + config.serverPort;
const canvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById('screen');
const input = new InputManager(canvas, document);
const renderer = new Renderer(canvas.getContext('2d'), canvas.width, canvas.height, window);
const networkService = new NetworkService(serverURL);
const engine = new Engine(renderer, input, networkService);

document.addEventListener('DOMContentLoaded', () => {
    engine.run();
    console.log('Started! Build: ' + BUILD_ID + ' Server: ' + serverURL);
});
