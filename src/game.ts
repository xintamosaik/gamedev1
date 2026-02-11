import type { Velocity } from 'types';
import { createThing, registerThing } from './things';
import { updateMovement } from './movement';
import { canvas, context, renderAll } from './render';

let last = 0;
const speed = 50;

const keys: Record<string, boolean> = {};
window.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});

window.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

const grass = createThing({
    position: { x: 200, y: 100 },
    render: { color: '#6dd072' }
});
registerThing(grass);

const player = createThing({
    position: { x: 100, y: 100 },
    velocity: { vx: 0, vy: 0 },
    render: { color: '#ff8080' }
});
registerThing(player);

const tree = createThing({
    position: { x: 300, y: 200 },
    render: { color: '#2ecc71' }
});
registerThing(tree);

function updateInputLogic(velocity: Velocity): void {
    velocity.vx = 0;
    velocity.vy = 0;

    if (keys['ArrowUp']) velocity.vy = -1;
    if (keys['ArrowDown']) velocity.vy = 1;
    if (keys['ArrowLeft']) velocity.vx = -1;
    if (keys['ArrowRight']) velocity.vx = 1;

    if (velocity.vx !== 0 && velocity.vy !== 0) {
        const length = Math.sqrt(velocity.vx * velocity.vx + velocity.vy * velocity.vy);
        velocity.vx /= length;
        velocity.vy /= length;
    }
}

function gameLoop(timestamp: number): void {
    const delta = (timestamp - last) / 1000;
    last = timestamp;
    updateInputLogic(player.velocity);

    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);

    updateMovement(delta, speed);
    renderAll();

    context.fillStyle = 'black';
    context.fillText(`FPS: ${Math.round(1 / delta)}`, 10, 30);

    window.requestAnimationFrame(gameLoop);
}

window.requestAnimationFrame(gameLoop);

