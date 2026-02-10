import { Entity } from "entities/entity";
import { Render } from "components/render";
import { Position } from "components/position";

export function updateRender(entities: Entity[], context: CanvasRenderingContext2D): void {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);

    entities.forEach(entity => {
        const position = entity.components['position'] as Position;
        const render = entity.components['render'] as Render;

        if (position && render) {
            context.fillStyle = render.color;
            context.fillRect(position.x, position.y, 50, 50);
        }
    });
}
