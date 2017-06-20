import * as Collections from "typescript-collections";
import Queue from "typescript-collections/dist/lib/Queue";

export enum TrackingEventType {Timing};

interface PendingTrackPoint {
    type: TrackingEventType,
    eventCategory: string,
    eventAction: string,
    eventValue: string|number
}

export class GaTrack {
    private static instance: GaTrack;
    private eventQueue: Queue<PendingTrackPoint> = new Collections.Queue<PendingTrackPoint>();
    private onceHits: string[] = [];
    private isGaLoaded:boolean = false;
    private isSenderPending:boolean = false;

    public static getInstance(): GaTrack {
        if (!GaTrack.instance) {
            GaTrack.instance = new GaTrack();
        }
        return GaTrack.instance;
    }

    public sendQueuedEvents()
    {
        if (typeof window === 'undefined' || typeof window.performance === 'undefined') {
            this.eventQueue.forEach((qe) => {
                console.log('Tracking Event removed', qe);
            });
            this.eventQueue.clear();
            return;
        }

        if (!this.isGaLoaded) {
            this.checkGA();
            if (!this.isSenderPending) {
                console.log('Waiting for trackers to able send queued events');
                setTimeout(() => this.sendQueuedEvents(), 1000);
                this.isSenderPending = true;
            }
            return;
        }

        while (!this.eventQueue.isEmpty()) {
            const pendingEvent = this.eventQueue.dequeue();
            console.log('Sending queued tracking event', pendingEvent);
            switch (pendingEvent.type) {
                case TrackingEventType.Timing:
                    ga('send', 'timing', pendingEvent.eventCategory, pendingEvent.eventAction, pendingEvent.eventValue);
                    break;
            }
        }
        this.isSenderPending = false;
    }

    public scheduleTimedEvent(trackPoint: PendingTrackPoint, once:boolean = true) {
        if (once && this.onceHits.indexOf(trackPoint.eventCategory) !== -1) {
            return;
        }
        this.eventQueue.enqueue(trackPoint);
        if (once) {
            this.onceHits.push(trackPoint.eventCategory);
        }
        setTimeout(() => this.sendQueuedEvents(), 1);
    }

    public static TrackTimeOnce(trackPoint: string) {
        GaTrack.getInstance().scheduleTimedEvent(<PendingTrackPoint>{
            type: TrackingEventType.Timing,
            eventCategory: trackPoint,
            eventAction: 'load',
            eventValue: Math.round(performance.now())
        });
    }

    private checkGA() {
        this.isGaLoaded = typeof ga !== 'undefined';
    }
}

export class TrackPoint {
    static JS_LOAD = 'js_load';
    static GAME_CONNECT = 'game_connect';
}
