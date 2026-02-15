import type { Render, Position, Velocity, Thing } from './types';
import { createThing, registerThing } from './things';
import { updateInputLogic } from './input';
import { updateMovement } from './movement';
import { canvas, context, renderAll } from './render';
import levelOne from './levels/one';
import { Background } from 'levels/types';


let previousFrameTime = 0;
const MAX_DELTA_TIME = 0.05;
const MOVEMENT_SCALE = 200; // max 50ms step

function createLevel(descriptions: Thing[]) {
    for (const description of descriptions) {
        const thing = createThing(description);
        registerThing(thing);
    }
}
type Player = {
    id: number,
    render: Render,
    velocity: Velocity,
    position: Position,
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
createLevel(levelOne.statics);
let activeLevel = levelOne;

function gameLoop(timestamp: number): void {

    const deltaTime = Math.min(
        (timestamp - previousFrameTime) / 1000, 
        MAX_DELTA_TIME
    ); 

    updateInputLogic(player.velocity);
    updateMovement(deltaTime, MOVEMENT_SCALE);
    
    drawBackground(activeLevel.background);
    renderAll();

    context.fillStyle = '#0f0';
    context.fillText(`FPS: ${Math.round(1 / deltaTime)}`, 10, 30);
    
    previousFrameTime = timestamp;
    window.requestAnimationFrame(gameLoop);
}

window.requestAnimationFrame(gameLoop);

