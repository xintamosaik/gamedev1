import type { Position, Velocity } from 'types';

export interface Movable {
    position: Position;
    velocity: Velocity;
}

const movables: Movable[] = [];

export function registerMovable(thing: Movable) {
    movables.push(thing);
}

export function updateMovement(delta: number, speed: number) {
    for (const e of movables) {
        e.position.x += e.velocity.vx * speed * delta;
        e.position.y += e.velocity.vy * speed * delta;
    }
}