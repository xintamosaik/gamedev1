import { ID } from 'things';
import player from 'player'
import { canvas, context, renderAll } from 'render';
import levelOne from 'levels/one';
import type { Background } from 'levels/types';
import {
    isSolid,
    registerSolid,
    checkCollisions,
    isInteractable,
    registerInteractable,
    checkProximity
} from 'collision';

import { isRenderable, registerRenderable } from 'render';

const DEBUG = true

let previousFrameTime = 0;
const MAX_DELTA_TIME = 0.05;


function isRecord(x: unknown): x is Record<string, unknown> {
    return typeof x === 'object' && x !== null;
}
function createLevel(descriptions: unknown[]) {
    for (const description of descriptions) {
        if (!isRecord(description)) continue;
        const thing = { ...description, id: ID() }

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
    if (bg.color) {
        context.fillStyle = bg.color;
        context.fillRect(0, 0, canvas.width, canvas.height);
    }
}

registerRenderable(player);

function gameLoop(timestamp: number): void {

    const deltaTime = Math.min(
        (timestamp - previousFrameTime) / 1000,
        MAX_DELTA_TIME
    );




    const collisions = checkCollisions(player.position, player.dimensions);
    const near = checkProximity(player.position, player.dimensions, player.aura);

    drawBackground(activeLevel.background);
    renderAll(near, collisions);

    if (DEBUG) context.fillStyle = '#0f0';
    if (DEBUG) context.fillText(`FPS: ${Math.round(1 / deltaTime)}`, 10, 30);

    previousFrameTime = timestamp;
    window.requestAnimationFrame(gameLoop);
}

window.requestAnimationFrame(gameLoop);

