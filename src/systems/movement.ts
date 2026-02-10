import { Entity } from "entities/entity";
import { Position } from "components/position";
import { Velocity } from "components/velocity";

export function updateMovement(entities: Entity[], delta: number, speed: number): void {
    entities.forEach(entity => {
        const position = entity.components['position'] as Position;
        const velocity = entity.components['velocity'] as Velocity;

        if (position && velocity) {
            position.x += velocity.vx * speed * delta;
            position.y += velocity.vy * speed * delta;
        }
    });
}
