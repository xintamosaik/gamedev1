import type { Velocity } from './types';

const keys: Record<string, boolean> = {};

window.addEventListener('keydown', e => {
    keys[e.key] = true;
});

window.addEventListener('keyup', e => {
    keys[e.key] = false;
});

export function updateInputLogic(velocity: Velocity): void {
    velocity.vx = 0;
    velocity.vy = 0;

    if (keys['ArrowUp']) velocity.vy = -1;
    if (keys['ArrowDown']) velocity.vy = 1;
    if (keys['ArrowLeft']) velocity.vx = -1;
    if (keys['ArrowRight']) velocity.vx = 1;

    if (velocity.vx && velocity.vy) {
        const len = Math.hypot(velocity.vx, velocity.vy);
        velocity.vx /= len;
        velocity.vy /= len;
    }
}