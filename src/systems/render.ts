import { Position } from "components/position";
import { Render } from "components/render";

interface Renderable {
    position: Position
    render: Render
}

export function updateRender(entities: Renderable[], context: CanvasRenderingContext2D): void {
    entities.forEach(entity => {
        context.fillStyle = entity.render.color;
        context.fillRect(entity.position.x, entity.position.y, 50, 50);
    });
}