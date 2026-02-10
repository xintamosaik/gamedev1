import { createEntity, addComponent } from "entities/entity";
import { createPosition } from "components/position";
import { createVelocity } from "components/velocity";
import { createRender } from "components/render";
import { updateMovement } from "systems/movement";
import { createInputSystem } from "systems/input";
import { updateRender } from "systems/render";

const canvas = document.getElementById('game') as HTMLCanvasElement;
const context = canvas.getContext('2d')!;

let delta = 0;
let last = 0;
let fps;
let speed = 50;

const player = createEntity(1);
addComponent(player, 'position', createPosition(100, 100));
addComponent(player, 'velocity', createVelocity(0, 0));
addComponent(player, 'render', createRender('#ff8080'));

const entities = [player];
const inputSystem = createInputSystem();

function gameLoop(timestamp: number): void {
    delta = (timestamp - last) / 1000;
    last = timestamp;
    fps = Math.round(1 / delta);

    inputSystem(entities);
    updateMovement(entities, delta, speed);
    updateRender(entities, context);

    context.fillStyle = 'white';
    context.fillRect(0, 0, 200, 50);
    context.font = '20px Arial';
    context.fillStyle = 'black';
    context.fillText(`FPS: ${fps}`, 10, 30);

    window.requestAnimationFrame(gameLoop);
}

window.requestAnimationFrame(gameLoop);
