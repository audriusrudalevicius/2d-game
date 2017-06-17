export class Renderer {
    private _context: CanvasRenderingContext2D;

    constructor(context: CanvasRenderingContext2D) {
        this._context = context;
    }

    public init() {
    }

    get context(): CanvasRenderingContext2D {
        return this._context;
    }
}