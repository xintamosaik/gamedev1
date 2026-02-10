interface Movable {
    velocity: { vx: number; vy: number };
}

export function createInputSystem() {
    const keys: Record<string, boolean> = {};

    window.addEventListener('keydown', (e) => keys[e.key] = true);
    window.addEventListener('keyup', (e) => keys[e.key] = false);

    // The system now accepts anything with a velocity property
    return function updateInput(entities: Movable[]) {
        entities.forEach(entity => {
            // No more .components['velocity']! 
            // We just zero out the velocity and apply input.
            entity.velocity.vx = 0;
            entity.velocity.vy = 0;

            if (keys['ArrowUp'])    entity.velocity.vy = -1;
            if (keys['ArrowDown'])  entity.velocity.vy = 1;
            if (keys['ArrowLeft'])  entity.velocity.vx = -1;
            if (keys['ArrowRight']) entity.velocity.vx = 1;
        });
    };
}