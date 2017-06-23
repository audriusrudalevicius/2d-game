import {GameObject} from "../GameObject";
import {Engine} from "../Engine";

export class PlayerInfo implements GameObject
{
    private context: CanvasRenderingContext2D;
    private engine:Engine;
    private startPosY: number = 25;
    private startPosX: number = 50;
    private increment: number = 10;

    init(engine: Engine): void {
        this.context = engine.renderer.context;
        this.engine = engine;
    }

    update(delta: number): void {

    }

    render(delta: number): void {
        let yPos = this.startPosY;
        this.engine.state.gameState.players.forEach(p => {
            this.context.fillStyle = p.color;
            this.context.fillText(`Player x: ${p.position.x} y: ${p.position.y} - ${p.name}`, this.startPosX, yPos);
            yPos = yPos + this.increment;
        });

        this.context.fillStyle = this.engine.state.gameState.player.color;
        this.context.fillText(`Player x: ${this.engine.state.gameState.player.position.x} y: ${this.engine.state.gameState.player.position.y} - ${this.engine.state.gameState.player.name}`, this.startPosX, yPos);
        yPos = yPos + this.increment;

        this.context.fillStyle = '#000';
        this.engine.objectManager.readyObjects.forEach((object) => {
            let objectID = object.toString();
            this.context.fillText(`Spartal: ${objectID}`, this.startPosX, yPos);
            yPos = yPos + this.increment;
        });
    }

    unload(): void {

    }

    toString(): string {
        return `Debug text`;
    }
}
