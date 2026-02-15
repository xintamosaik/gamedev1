import { Position, Render, Dimensions } from './types';

export const canvas = document.getElementById('game') as HTMLCanvasElement;
export const context = canvas.getContext('2d')!;

export interface Renderable {
    position: Position;
    dimensions: Dimensions,
    render: Render;
}

const renderables: Renderable[] = [];

function isRenderable(thing: unknown): thing is Renderable {
    return (
        typeof thing === 'object' &&
        thing !== null &&
        'position' in thing &&
        'render' in thing &&
        'dimensions' in thing
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
    context.fillRect(e.position.x, e.position.y, e.dimensions.w, e.dimensions.h);
  }
}
