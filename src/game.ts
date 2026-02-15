import { ID } from './things';
import { updateInputLogic } from './input';
import { updateMovement } from './movement';
import { canvas, context, renderAll } from './render';
import levelOne from './levels/one';
import { Background } from 'levels/types';
import { 
    isSolid, 
    registerSolid, 
    checkCollisions, 
    isInteractable, 
    registerInteractable,
    checkProximity
} from 'collision';
import { registerMovable } from './movement';
import { isRenderable, registerRenderable } from './render';


let previousFrameTime = 0;
const MAX_DELTA_TIME = 0.05;
const MOVEMENT_SCALE = 200; // max 50ms step

const player =   {
        id: ID(),
        position: { x: 100, y: 100 },
        dimensions: { w: 50, h: 50 },
        velocity: { vx: 0, vy: 0 },
        render: { color: '#d5a442' },
        aura: 20,
}
registerMovable(player);
registerRenderable(player);

function isRecord(x: unknown): x is Record<string, unknown> {
  return typeof x === 'object' && x !== null;
}
function createLevel(descriptions: unknown[]) {
    for (const description of descriptions) {
        if (!isRecord(description)) continue;
        const thing = { ...description, id: ID()} 
  
        if (isRenderable(thing)) {
            registerRenderable(thing);
        }
        if (isSolid(thing)) {
            registerSolid(thing);
        }

        if (isInteractable(thing)) {
            registerInteractable(thing);
        }
   
    }
}
createLevel(levelOne.statics);
let activeLevel = levelOne;

function drawBackground(bg: Background) {
    if (bg.color ) {
        context.fillStyle = bg.color;
        context.fillRect(0, 0, canvas.width, canvas.height);
    }
}



function gameLoop(timestamp: number): void {

    const deltaTime = Math.min(
        (timestamp - previousFrameTime) / 1000, 
        MAX_DELTA_TIME
    ); 

    updateInputLogic(player.velocity);
    updateMovement(deltaTime, MOVEMENT_SCALE);
  
    const collisions = checkCollisions(player.position, player.dimensions);
    player.render.color = collisions.length > 0 ? '#f00' : '#d5a442';
    const near = checkProximity(player.position, player.dimensions, player.aura);
    player.render.color = near.length > 0 ? '#ff0' : player.render.color;
    drawBackground(activeLevel.background);
    renderAll();

    context.fillStyle = '#0f0';
    context.fillText(`FPS: ${Math.round(1 / deltaTime)}`, 10, 30);
    
    previousFrameTime = timestamp;
    window.requestAnimationFrame(gameLoop);
}

window.requestAnimationFrame(gameLoop);

