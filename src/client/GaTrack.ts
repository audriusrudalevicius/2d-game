export class GaTrack {
    private static ONCE_POINTS:string[] = [];

    public static TrackTimeOnce(trackPoint:string) {
        if (GaTrack.ONCE_POINTS.indexOf(trackPoint) !== -1) {
            return;
        }
        if (typeof window !== 'undefined' && window.performance && typeof ga !== 'undefined') {
            ga('send', 'timing', trackPoint, 'load', Math.round(performance.now()));
        }
        GaTrack.ONCE_POINTS.push(trackPoint);
    }
}

export const TrackPoint = {
    JS_LOAD: 'js_load',
    GAME_CONNECT: 'game_connect'
}
