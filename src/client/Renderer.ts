export class Renderer {
    private _context: CanvasRenderingContext2D;
    public width:number;
    public height:number;

    constructor(context: CanvasRenderingContext2D, width: number, height: number, private window:Window) {
        this._context = context;
        this.width = width;
        this.height = height;
    }

    public init() {
    }

    get context(): CanvasRenderingContext2D {
        return this._context;
    }

    requestAnimationFrame(param: () => void) {
        this.window.requestAnimationFrame(param);
    }
}
