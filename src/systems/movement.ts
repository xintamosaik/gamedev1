interface Movable {
    position: { x: number; y: number };
    velocity: { vx: number; vy: number };
}

export function updateMovement(entities: Movable[], delta: number, speed: number): void {
    entities.forEach(entity => {
        // No .components, no casting, no 'if' checks needed!
        // TypeScript guarantees these exist because of the Movable interface.
        entity.position.x += entity.velocity.vx * speed * delta;
        entity.position.y += entity.velocity.vy * speed * delta;
    });
}