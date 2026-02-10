interface Renderable {
    position: { x: number; y: number };
    render: { color: string };
}

export function updateRender(entities: Renderable[], context: CanvasRenderingContext2D): void {
    // Note: Usually, you want to clear the canvas once at the start of your 
    // gameLoop in game.ts, rather than inside the entity loop!
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);

    entities.forEach(entity => {
        // Direct access: No casting, no components, no 'if' checks.
        context.fillStyle = entity.render.color;
        context.fillRect(entity.position.x, entity.position.y, 50, 50);
    });
}