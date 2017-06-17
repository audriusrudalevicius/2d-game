import {Engine} from "./client/engine";
import {InputManager} from "./client/InputManager";
import {Renderer} from "./client/Renderer";
import NetworkService from "./client/NetworkService";

const canvas:HTMLCanvasElement = <HTMLCanvasElement> document.getElementById('screen');
const input = new InputManager(canvas);
const renderer = new Renderer(canvas.getContext('2d'));
const networkService = new NetworkService();
const engine = new Engine(renderer, input, networkService);

engine.run();
