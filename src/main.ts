import {Engine} from "./client/Engine";
import {InputManager} from "./client/InputManager";
import {Renderer} from "./client/Renderer";
import NetworkService, {getNetworkService} from "./client/NetworkService";

const canvas:HTMLCanvasElement = <HTMLCanvasElement> document.getElementById('screen');
const input = new InputManager(canvas);
const renderer = new Renderer(canvas.getContext('2d'));
const networkService = getNetworkService();
const engine = new Engine(renderer, input, networkService);

engine.run();
