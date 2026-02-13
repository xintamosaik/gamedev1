import type { Static, Player } from './types';
import { createThing, registerThing } from './things';
import { updateInputLogic } from './input';
import { updateMovement } from './movement';
import { canvas, context, renderAll } from './render';
import levelOne from './levels/one';
import { Background } from 'levels/types';


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
function drawBackground(bg: Background) {
  if (bg.kind === 'solid') {
    context.fillStyle = bg.color;
    context.fillRect(0, 0, canvas.width, canvas.height);
  }
}

registerThing(player);
loadLevel(levelOne.statics);
let currentLevel = levelOne;

function gameLoop(timestamp: number): void {

    const delta = Math.min((timestamp - last) / 1000, 0.05); // max 50ms step
    updateInputLogic(player.velocity);

    drawBackground(currentLevel.background);

    updateMovement(delta, speed);
    renderAll();

    context.fillStyle = '#0f0';
    context.fillText(`FPS: ${Math.round(1 / delta)}`, 10, 30);

    window.requestAnimationFrame(gameLoop);
}

window.requestAnimationFrame(gameLoop);

