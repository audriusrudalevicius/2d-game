import * as Collections from "typescript-collections";
import {GameObject} from "../GameObject";
import {Subject} from "rxjs/Subject";
import {Engine} from "../Engine";

export class ObjectManager {
    private pendingQueue = new Subject<string>();
    private pendingUnloadObjects = new Collections.Queue<string>();
    private readyObjects: Map<string, GameObject> = new Map<string, GameObject>();
    private pendingObjects: Map<string, GameObject> = new Map<string, GameObject>();

    public run(engine: Engine) {
        this.pendingQueue.subscribe((p: string) => {
            const object = this.pendingObjects.get(p);
            object.init(engine);
            this.pendingObjects.delete(p);
            this.readyObjects.set(p, object);
        });
    }

    public findObject(key:string): GameObject {
        return this.readyObjects.get(key) || this.pendingObjects.get(key);
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
        this.readyObjects.forEach(o => {
            o.unload();
        });
        this.readyObjects.clear();
    }

    public cleanUp(delta: number) {
        if (this.pendingUnloadObjects.isEmpty()) {
            return;
        }
        while (!this.pendingUnloadObjects.isEmpty()) {
            // TODO Check if there is enough time in frame.
            let next = this.pendingUnloadObjects.dequeue();
            this.readyObjects.get(next).unload();
            this.readyObjects.delete(next);
        }
    }

    public update(delta: number) {
        this.readyObjects.forEach(o => o.update(delta));
    }

    public render(delta: number) {
        this.readyObjects.forEach(o => o.render(delta));
    }
}
