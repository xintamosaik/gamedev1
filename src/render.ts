
import { Position, Render, Dimensions, ID as ThingID } from './types';
export const canvas = document.getElementById('game') as HTMLCanvasElement;
export const context = canvas.getContext('2d')!;

export interface Renderable {
    position: Position;
    dimensions: Dimensions,
    render: Render;
}

const renderables: Renderable[] = [];
export function isRenderable(thing: unknown): thing is Renderable {
  if (typeof thing !== 'object' || thing === null) return false;
  if (!('id' in thing)) return false;
  if (!('render' in thing)) return false;
  if (!('position' in thing) || !('dimensions' in thing)) return false;
  return true;
}


export function registerRenderable(thing: Renderable) {
    renderables.push(thing);
}



export interface Renderable {
  id: ThingID;
  position: Position;
  dimensions: Dimensions;
  render: Render;
}

export function renderAll(near: { id: ThingID }[], collisions: { id: ThingID }[]) {
  const nearIds = new Set(near.map(x => x.id));
  const collisionIds = new Set(collisions.map(x => x.id));

  for (const e of renderables) {
    let color = e.render.color;

    if (nearIds.has(e.id)) color = '#ff0';
    if (collisionIds.has(e.id)) color = '#f00';

    context.fillStyle = color;
    context.fillRect(e.position.x, e.position.y, e.dimensions.w, e.dimensions.h);
  }
}

