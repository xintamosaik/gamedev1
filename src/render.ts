import { Position, Render } from './types';

export const canvas = document.getElementById('game') as HTMLCanvasElement;
export const context = canvas.getContext('2d')!;
const renderables: Renderable[] = [];

export interface Renderable {
    position: Position;
    render: Render;
}
function isRenderable(thing: unknown): thing is Renderable {
    return (
        typeof thing === 'object' &&
        thing !== null &&
        'position' in thing &&
        'render' in thing
    );
}
export function registerRenderable(thing: unknown) {
    if (isRenderable(thing)) {
        renderables.push(thing);
    }
}

export function renderAll() {
    for (const e of renderables) {
        context.fillStyle = e.render.color;
        context.fillRect(e.position.x, e.position.y, 50, 50);
    }
}