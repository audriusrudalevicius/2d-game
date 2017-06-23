import * as Collections from "typescript-collections";
import {GameObject} from "../GameObject";
import {Subject} from "rxjs/Subject";
import {Engine} from "../Engine";

export class ObjectManager {
    private pendingQueue = new Subject<string>();
    private pendingUnloadObjects = new Collections.Queue<string>();
    private _readyObjects: Map<string, GameObject> = new Map<string, GameObject>();
    private pendingObjects: Map<string, GameObject> = new Map<string, GameObject>();

    get readyObjects(): Map<string, GameObject> {
        return this._readyObjects;
    }

    public run(engine: Engine) {
        this.pendingQueue.subscribe((p: string) => {
            const object = this.pendingObjects.get(p);
            object.init(engine);
            this.pendingObjects.delete(p);
            this._readyObjects.set(p, object);
        });
    }

    public findObject(key:string): GameObject {
        return this._readyObjects.get(key) || this.pendingObjects.get(key);
    }

    public addObject(key: string, object: GameObject) {
        const exists = this.pendingObjects.get(key);
        this.pendingObjects.set(key, object);
        if (!exists) {
            this.pendingQueue.next(key);
        }
    }

    public removeObject(key: string) {
        if (!this.pendingUnloadObjects.contains(key)) {
            this.pendingUnloadObjects.enqueue(key);
        }
    }

    public clear() {
        this._readyObjects.forEach(o => {
            o.unload();
        });
        this._readyObjects.clear();
    }

    public cleanUp(delta: number) {
        if (this.pendingUnloadObjects.isEmpty()) {
            return;
        }
        while (!this.pendingUnloadObjects.isEmpty()) {
            // TODO Check if there is enough time in frame.
            let next = this.pendingUnloadObjects.dequeue();
            this._readyObjects.get(next).unload();
            this._readyObjects.delete(next);
        }
    }

    public update(delta: number) {
        this._readyObjects.forEach(o => o.update(delta));
    }

    public render(delta: number) {
        this._readyObjects.forEach(o => o.render(delta));
    }
}
