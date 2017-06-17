export class Timer {
    private last: number = 0;
    private now: number;
    public delta: number;
    public readonly rate = 1 / 60;

    private timestamp(): number {
        return typeof window != "undefined" && window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
    }

    public start() {
        this.now = this.timestamp();
        this.delta = Math.min(1, (this.now - this.last) / 1000);
    }

    public tick() {
        this.delta= this.delta - this.rate;
    }

    public end() {
        this.last = this.now;
    }
}
