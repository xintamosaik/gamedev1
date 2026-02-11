import type { Position, Velocity } from 'types';

export interface Movable {
    position: Position;
    velocity: Velocity;
}

const movables: Movable[] = [];
function isMovable(thing: unknown): thing is Movable {
    return (
        typeof thing === 'object' &&
        thing !== null &&
        'position' in thing &&
        'velocity' in thing
    );
}
export function registerMovable(thing: unknown) {
    if (isMovable(thing)) {
        movables.push(thing);
    }
}

export function updateMovement(delta: number, speed: number) {
    for (const e of movables) {
        e.position.x += e.velocity.vx * speed * delta;
        e.position.y += e.velocity.vy * speed * delta;
    }
}