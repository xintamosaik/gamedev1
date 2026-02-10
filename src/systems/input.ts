import { Entity } from "entities/entity";
import { Velocity } from "components/velocity";

export function createInputSystem() {
    const keys: { [key: string]: boolean } = {};

    window.addEventListener('keydown', (e) => keys[e.key] = true);
    window.addEventListener('keyup', (e) => keys[e.key] = false);

    return function updateInput(entities: Entity[]) {
        entities.forEach(entity => {
            const velocity = entity.components['velocity'] as Velocity;
            if (velocity) {
                velocity.vx = 0;
                velocity.vy = 0;

                if (keys['ArrowUp']) velocity.vy = -1;
                if (keys['ArrowDown']) velocity.vy = 1;
                if (keys['ArrowLeft']) velocity.vx = -1;
                if (keys['ArrowRight']) velocity.vx = 1;
            }
        });
    };
}
