import { Velocity } from "components/velocity";

interface Movable {
    velocity: Velocity
}

export function createInputSystem() {
    const keys: Record<string, boolean> = {};

    window.addEventListener('keydown', (e) => keys[e.key] = true);
    window.addEventListener('keyup', (e) => keys[e.key] = false);

    return function updateInput(entities: Movable[]) {
        entities.forEach(entity => {
            entity.velocity.vx = 0;
            entity.velocity.vy = 0;

            if (keys['ArrowUp'])    entity.velocity.vy = -1;
            if (keys['ArrowDown'])  entity.velocity.vy = 1;
            if (keys['ArrowLeft'])  entity.velocity.vx = -1;
            if (keys['ArrowRight']) entity.velocity.vx = 1;
        });
    };
}