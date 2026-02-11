import type { Static, Player } from './types';
import { createThing, registerThing } from './things';
import { updateInputLogic } from './input';
import { updateMovement } from './movement';
import { canvas, context, renderAll } from './render';
import world from './levels/one';


let last = 0;
const speed = 50;

function loadLevel(descriptions: Static[]) {
    for (const description of descriptions) {
        const thing = createThing(description);
        registerThing(thing);
    }
}

const player: Player = createThing(
    {
        position: { x: 100, y: 100 },
        velocity: { vx: 0, vy: 0 },
        render: { color: '#ff8080' }
    }
);
registerThing(player);
loadLevel(world);

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

