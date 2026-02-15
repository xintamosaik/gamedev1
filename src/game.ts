import type { Render, Position, Velocity, Dimensions } from './types';
import { ID, registerThing } from './things';
import { updateInputLogic } from './input';
import { updateMovement } from './movement';
import { canvas, context, renderAll } from './render';
import levelOne from './levels/one';
import { Background } from 'levels/types';

let previousFrameTime = 0;
const MAX_DELTA_TIME = 0.05;
const MOVEMENT_SCALE = 200; // max 50ms step

function createLevel(descriptions: object[]) {
    for (const description of descriptions) {
        const thing = { ...description, id: ID()} 
        registerThing(thing);
    }
}

type Player = {
    id: number,
    render: Render,
    dimensions: Dimensions,
    velocity: Velocity,
    position: Position,
}

const player: Player =   
    {
        id: ID(),
        position: { x: 100, y: 100 },
        dimensions: { w: 50, h: 50 },
        velocity: { vx: 0, vy: 0 },
        render: { color: '#d5a442' }
    }


function drawBackground(bg: Background) {
    if (bg.color ) {
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

