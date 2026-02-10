import { createInputSystem } from "systems/input";
import { updateMovement } from "systems/movement";
import { updateRender } from "systems/render";

const canvas = document.getElementById('game') as HTMLCanvasElement;
const context = canvas.getContext('2d')!;

let last = 0;
const speed = 50;

const player = {
    id: 1,
    position: { x: 100, y: 100 },
    velocity: { vx: 0, vy: 0 },
    render: { color: '#ff8080' }
};

const entities = [player];
const inputSystem = createInputSystem();

function gameLoop(timestamp: number): void {
    const delta = (timestamp - last) / 1000;
    last = timestamp;

    inputSystem([player]); 
    updateMovement(entities, delta, speed); 
    updateRender(entities, context);

    context.fillStyle = 'black';
    context.fillText(`FPS: ${Math.round(1 / delta)}`, 10, 30);

    window.requestAnimationFrame(gameLoop);
}

window.requestAnimationFrame(gameLoop);