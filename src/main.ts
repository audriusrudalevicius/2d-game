import {Engine} from "./client/engine";
import {InputManager} from "./client/InputManager";
import {Renderer} from "./client/Renderer";
import getNetworkService from './client/NetworkService';

import * as SocketIOClient from 'socket.io-client';

const canvas:HTMLCanvasElement = <HTMLCanvasElement> document.getElementById('screen');
const input = new InputManager(canvas);
const renderer = new Renderer(canvas.getContext('2d'));
const engine = new Engine(renderer, input);

engine.start();

let networkService = getNetworkService();
networkService.connect();
