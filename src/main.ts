const canvas:HTMLCanvasElement = <HTMLCanvasElement> document.getElementById('tutorial');
const input = new InputManager(canvas);
const renderer = new Renderer(canvas.getContext('2d'));
const engine = new Engine(renderer, input);
engine.start();
