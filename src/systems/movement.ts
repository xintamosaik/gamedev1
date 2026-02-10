import { Position } from "components/position";
import { Velocity } from "components/velocity";

interface Movable {
    position: Position
    velocity: Velocity
}

export function updateMovement(entities: Movable[], delta: number, speed: number): void {
    entities.forEach(entity => {
        entity.position.x += entity.velocity.vx * speed * delta;
        entity.position.y += entity.velocity.vy * speed * delta;
    });
}