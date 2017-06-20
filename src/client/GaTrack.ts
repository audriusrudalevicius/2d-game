export class GaTrack {
    private static ONCE_POINTS:TrackPoint[] = [];

    public static TrackTimeOnce(trackPoint:TrackPoint) {
        if (GaTrack.ONCE_POINTS.indexOf(trackPoint) !== -1) {
            return;
        }
        if (window.performance) {
            ga('send', 'timing', trackPoint, 'load', Math.round(performance.now()));
        }
        GaTrack.ONCE_POINTS.push(trackPoint);
    }
}

export enum TrackPoint {
    JS_LOAD = 'js_load',
    GAME_CONNECT = 'game_connect'
}
