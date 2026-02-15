import { Position, Render, Dimensions } from './types';

export const canvas = document.getElementById('game') as HTMLCanvasElement;
export const context = canvas.getContext('2d')!;

export interface Renderable {
    position: Position;
    dimensions: Dimensions,
    render: Render;
}

const renderables: Renderable[] = [];

export function registerRenderable(thing: Renderable) {
    renderables.push(thing);
}

export function renderAll() {
  for (const e of renderables) {
    context.fillStyle = e.render.color;
    context.fillRect(e.position.x, e.position.y, e.dimensions.w, e.dimensions.h);
  }
}
